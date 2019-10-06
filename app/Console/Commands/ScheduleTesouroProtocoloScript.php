<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Carbon\Carbon;
// Models
use App\Models\ImportLog;
use App\Models\Ativos\AtivosPrecosTaxas;
use App\Models\Ativos\AtivosProtocolo;
use App\Models\Parametros\Representantes;
use App\Models\Parametros\Titulos;
use App\Models\Parametros\Operacao;
use App\Models\Parametros\Situacao;
use App\Models\User;
use App\Models\DataImport;
use App\Models\Ativos\AtivosExtrato;

class ScheduleTesouroProtocoloScript extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tesouro:protocolo {--e|echo : Exibe o retorno do comando}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recupera os Protocolos do usuário';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->users = new User();
        $this->log = new ImportLog();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        foreach ($this->users->all() as $user) {

            $toDay = $this->log
            ->where('created_at', '>=', today())
            ->where('user_id', $user->id)
            ->where('categoria_importacao', 'TESOURO DIRETO INVESTIMENTO')
            ->where('tipo_erro', NULL)
            ->count();
            // ->toSql();
            // dd($toDay);

            if($toDay == 0){
                $storage_path = storage_path('app/temp/');
                $process = new Process('python '.base_path("vendor/bulfaitelo/tesouro-direto-scraper/tesouro_direto_protocolo.py {$user->tesouro_ac_number} {$user->tesouro_ac_password} {$storage_path} 2>&1"));
                $process->setTimeout(180);
                $process->run(function ($type, $buffer) {
                    if($this->option('echo')){
                        if (Process::ERR === $type) {                        
                            echo 'ERRO > '.$buffer;
                        } else {
                            echo $buffer;
                        }
                    }
                });
        
                $return_shell = $process->getOutput();            
    
                // Checando se ocorreu algum erro
                if($this->isJSON($return_shell)){
                    $return_json = json_decode($return_shell);                    
                    foreach ($return_json as $row) {
                        if(isset($row->numero_protocolo)){
                            $check_operacao = AtivosProtocolo::where('protocolo', $row->numero_protocolo)->first();
                            if($check_operacao === null){
                                $operacao = new AtivosProtocolo();
                                $operacao->user_id = $user->id;
                                $operacao->protocolo = $row->numero_protocolo;
                                $operacao->operacao_id = Operacao::firstOrCreate(['nome_operacao' => $row->operacao])->id;
                                $operacao->situacao_id = Situacao::firstOrCreate(['nome_situacao' => $row->situacao])->id;
                                $operacao->realizacao = $row->realizacao;
                                $operacao->liquidacao = $row->liquidacao;
                                $operacao->representante_id = Representantes::firstOrCreate(['nome_representante' => $row->representante])->id;
                                $operacao->titulo_id = Titulos::firstOrCreate(['nome_titulo' => $row->titulo])->id;
                                $operacao->quantidade = $row->quantidade;
                                $operacao->valor_unitario = $row->valor_unitario;
                                $operacao->taxa_juros = $row->taxa_juros;
                                $operacao->taxa_b3 = $row->taxa_b3;
                                $operacao->taxa_custodia = $row->taxa_custodia;
                                $operacao->valor_total = $row->valor_total;
                                $check_save = $operacao->save();                        
                            } else {
                                $operacao = AtivosProtocolo::find($check_operacao->id);
                                if(!$operacao->correcao){
                                    $operacao->liquidacao = $row->liquidacao;
                                    $operacao->situacao_id = Situacao::firstOrCreate(['nome_situacao' => $row->situacao])->id;
                                    $operacao->taxa_juros = $row->taxa_juros;
                                    $operacao->taxa_b3 = $row->taxa_b3;
                                    $operacao->valor_unitario = $row->valor_unitario;
                                    $operacao->valor_total = $row->valor_total;
                                    $check_save = $operacao->save();
                                }
                            }   
                        }                 
                    }
                    //  ==================================
                    // LOG
                    $log = $this->log;
                    $log->log = $return_shell;
                    $log->user_id = $user->id;
                    $log->categoria_importacao = 'TESOURO DIRETO INVESTIMENTO';
                    $log->save(); 
                    // =======================
                } else {
                    //  ERRO LOG
                    $errorLog = $this->log;
                    $errorLog->log = $return_shell;
                    $errorLog->user_id = $user->id;
                    $errorLog->categoria_importacao = 'TESOURO DIRETO INVESTIMENTO';                    
                    $errorLog->tipo_erro = "ERRO DE IMPORTACAO";
                    $errorLog->save();
                    if(Storage::move('temp/erro.png', '/public/erro_log/'.$errorLog->id.'.png')){
                        Storage::delete('temp/erro.png');
                    }
                    // ============================
                }
            }
        }
    }

    /**
     * Check Json string
     *
     * @param  integer $size
     * @return error
     */

    function isJSON($string){
        return is_string($string) && is_array(json_decode($string, true)) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
    }
}
