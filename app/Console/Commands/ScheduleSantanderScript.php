<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Carbon\Carbon;
use Storage;

// Models
use App\Models\SantanderExtrato;
use App\Models\SantanderAniversario;
use App\Models\ImportLog;
use App\Models\User\User;

class ScheduleSantanderScript extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bank:santander {--e|echo : Exibe o retorno do comando}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Busca todos os usuários e realiza a atualização do Banco Santander';

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
            $storage_path = storage_path('app/temp/');
            $process = new Process('python '.base_path("vendor/bulfaitelo/santander-scraper/santander_poupanca.py {$user->santander_ac_number} {$user->santander_ac_password} {$storage_path} 2>&1"));
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
                $santander_json = json_decode($return_shell);    
                // EXTRATO
                $extrato = $santander_json[1];            
                foreach ($extrato->extrato as $row_extrato) {
                    // verificando se ja existe            
                    $check_value = SantanderExtrato::where('documento', $row_extrato->documento)->count();            
                    if($check_value == 0){
                        $santander = New SantanderExtrato();
                        $santander->user_id = $user->id;
                        $santander->data = $row_extrato->data;
                        $santander->documento = $row_extrato->documento;
                        $santander->historico = $row_extrato->historico;
                        $santander->valor_movimento = $row_extrato->valor_movimento;
                        $santander->saldo = $row_extrato->saldo;
                        $validation = $santander->save();                    
                    }            
                }
                //  ===============================================
                // ANIVERSARIO
                $aniversario = $santander_json[2];        
                foreach ($aniversario->aniversario as $row_aniversario) {
                    $check_value = SantanderAniversario::where('data', $row_aniversario->data)
                    ->where('user_id', $user->id)
                    ->count();
                    if($check_value == 0){
                        // insert
                        $insert_aniversario = new SantanderAniversario();
                        $insert_aniversario->user_id = $user->id;
                        $insert_aniversario->data = $row_aniversario->data;
                        $insert_aniversario->valor = $row_aniversario->valor;
                        $validation_aniversario = $insert_aniversario->save(); 
                        
                    }else{
                        // update
                        $update_aniversario = SantanderAniversario::where('data', $row_aniversario->data)
                        ->where('user_id', $user->id)                
                        ->first();
                        $update_aniversario->valor = $row_aniversario->valor;
                        $validation_aniversario = $update_aniversario->save();
                        
                    }            
                }
                //  ===============================================
                // Log            
                $log = $this->log;
                $log->user_id = $user->id;
                $log->categoria_importacao = 'SANTANDER';                
                $log->log = $return_shell;
                $log->save();            
                //  ===============================================
            } else {
                // Log            
                $errorLog = $this->log;
                $errorLog->user_id = $user->id;
                $errorLog->categoria_importacao = 'SANTANDER';
                $errorLog->tipo_erro = "ERRO DE IMPORTACAO";
                $errorLog->log = $return_shell;
                $errorLog->save();
                if(Storage::move('temp/erro.png', '/public/erro_log/'.$errorLog->id.'.png')){
                    Storage::delete('temp/erro.png');
                }
                //  ===============================================
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
