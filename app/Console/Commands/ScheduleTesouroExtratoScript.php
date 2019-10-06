<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Carbon\Carbon;
// Models
use App\Models\ImportLog;
use App\Models\Ativos\AtivosPrecosTaxas;
use App\Models\Parametros\Representantes;
use App\Models\Parametros\Titulos;
use App\Models\Parametros\Operacao;
use App\Models\Parametros\Situacao;
use App\Models\User;
use App\Models\DataImport;
use App\Models\Ativos\AtivosExtrato;

class ScheduleTesouroExtratoScript extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tesouro:extrato {--e|echo : Exibe o retorno do comando}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recupera o extrato diario do usuário';

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
            ->where('categoria_importacao', 'TESOURO DIRETO')
            ->where('tipo_erro', NULL)
            ->count();
            // ->toSql();
            // dd($toDay);
            if($toDay == 0){
                $storage_path = storage_path('app/temp/');
                $process = new Process('python '.base_path("vendor/bulfaitelo/tesouro-direto-scraper/tesouro_direto_extrato.py {$user->tesouro_ac_number} {$user->tesouro_ac_password} {$storage_path} 2>&1"));
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
                    $count= 0 ;
                    foreach ($return_json as $row) {
                        if(isset($row->nome_representante)){
                            $ativo = new AtivosExtrato();
                            $ativo->user_id = $user->id;
                            $ativo->representante_id = Representantes::firstOrCreate(['nome_representante' => $row->nome_representante])->id;
                            
                            $ativo->titulo_id = Titulos::firstOrCreate(['nome_titulo' => $row->titulo, 'data_vencimento'=> Carbon::parse($row->vencimento)])->id;
                            // dd(DataImport::firstOrCreate(['data_import'=> now(), 'data_anterior' => DataImport::where('data_import', '<', now())->firstOrfail()->data_import ])->id);
                            $data_anterior = DataImport::where('data_import', '<', now()->format('Y-m-d'))->orderBy('data_import', 'desc')->first();
                            if($data_anterior){
                                $data_anterior = $data_anterior->data_import;
                            }                            
                            $ativo->data_import_id = DataImport::firstOrCreate(['data_import'=> now()->format('Y-m-d'), 'data_anterior' => $data_anterior->format('Y-m-d') ])->id;                            
                            $ativo->valor_investido =$row->valor_investido;
                            $ativo->valor_bruto_atual =  $row->valor_bruto_atual;
                            $ativo->valor_liquido_atual = $row->valor_liquido_atual;
                            $ativo->quant_total = $row->quant_total;
                            $ativo->quant_bloqueado = $row->quant_bloqueado;
                            $check_save = $ativo->save();
                            $count++;
                        }
                    }
                    //  ==================================
                    // LOG
                    $log = $this->log;
                    $log->log = $return_shell;
                    $log->user_id = $user->id;
                    $log->categoria_importacao = 'TESOURO DIRETO';
                    $log->save(); 
                    // =======================
                } else {
                    //  ERRO LOG
                    $errorLog = $this->log;
                    $errorLog->log = $return_shell;
                    $errorLog->user_id = $user->id;
                    $errorLog->categoria_importacao = 'TESOURO DIRETO';                    
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
