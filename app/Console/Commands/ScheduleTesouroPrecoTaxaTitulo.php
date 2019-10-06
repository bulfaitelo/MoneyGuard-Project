<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Carbon\Carbon;
// Models
use App\Models\ImportLog;
use App\Models\Ativos\AtivosPrecosTaxas;
use App\Models\Parametros\Titulos;

class ScheduleTesouroPrecoTaxaTitulo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tesouro:preco {--e|echo : Exibe o retorno do comando}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Retornar os preços Diários dos Ativos do tesouro Direto';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->log = new ImportLog(); 
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        
        $toDay = $this->log
        ->where('created_at', '>=', today())
        ->where('user_id', '1')
        ->where('categoria_importacao', 'TESOURO DIRETO PRECO E TAXA')
        ->where('tipo_erro', NULL)
        ->count();
        // ->toSql();
        // dd($toDay);
        if($toDay == 0){ 
            $storage_path = storage_path('app/temp/');
            $process = new Process('python '.base_path("vendor/bulfaitelo/tesouro-direto-scraper/tesouro_direto_precos_taxa_titulo.py {$storage_path} 2>&1"));
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
                    if(isset($row->titulo)){                                                                       
                        $preco = new AtivosPrecosTaxas();
                        $preco->taxa_rendimento = $row->taxa_rendimento;
                        $preco->valor_minimo = $row->valor_minimo;
                        $preco->preco_unitario = $row->preco_unitario;
                        $preco->titulo_id = Titulos::firstOrCreate(['nome_titulo' => $row->titulo, 'data_vencimento'=> Carbon::parse($row->vencimento)])->id;
                        $check_save = $preco->save();                        
                    }                 
                }
                //  ==================================
                // LOG
                $log = $this->log;
                $log->log = $return_shell;
                $log->user_id = '1';
                $log->categoria_importacao = 'TESOURO DIRETO PRECO E TAXA';
                $log->save(); 
                // =======================
            } else {
                //  ERRO LOG
                $errorLog = $this->log;
                $errorLog->log = $return_shell;
                $errorLog->user_id = '1';
                $errorLog->categoria_importacao = 'TESOURO DIRETO PRECO E TAXA';                    
                $errorLog->tipo_erro = "ERRO DE IMPORTACAO";
                $errorLog->save();
                if(Storage::move('temp/erro.png', '/public/erro_log/'.$errorLog->id.'.png')){
                    Storage::delete('temp/erro.png');
                }
                // ============================
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
