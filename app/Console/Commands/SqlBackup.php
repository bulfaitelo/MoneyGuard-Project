<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
// EMAIL
use App\Mail\SqlBackupLog;
use Mail;
// Models
use App\Models\SqlLog;

class SqlBackup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:backup {--e|echo : Exibe o retorno do comando}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Faz backup completo do banco de dados';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $data = now()->format('Y-m-d_h-i');
        $defaut_connection = config('database.default');
        $database_info = config('database.connections.'.$defaut_connection);
        $database = $database_info['database'];
        $user = $database_info['username'];
        $pass = $database_info['password'];
        $file = "{$database}_{$data}.sql.gz";
        $storage_path = storage_path("app/sql/{$file}");
        $command = "mysqldump --verbose --user={$user} -p{$pass} {$database} | gzip > {$storage_path} ";
        // execução comando
        // dd($command);  
        $log = '';     
        exec("({$command}) 2>&1", $output, $result);
        foreach ($output as $value) {
            $log.=$value;
            if($this->option('echo')){
                echo $value;
            }
        }        
        // log
        $sqlLog = new SqlLog();
        $sqlLog->log = $log;
        $size = $this->formatBytes(Storage::size("sql/{$file}"));
        $sqlLog->size = $size;
        $sqlLog->save();
        // Enviando email 
        $emailBlade = new SqlBackupLog();
        $emailBlade->with([
            'file_name' => $file,  
            'file_size' => $size,
            'date' => $data,
        ])->attach($storage_path);
        Mail::to('bulfaitelo@gmail.com')->send($emailBlade);
        // Mail::to('thiagorodriguesmelo@hotmail.com')->send($emailBlade);
    }

    /**
     * Format bytes to kb, mb, gb, tb
     *
     * @param  integer $size
     * @param  integer $precision
     * @return integer
     */
    public static function formatBytes($size, $precision = 2) {
        if ($size > 0) {
            $size = (int) $size;
            $base = log($size) / log(1024);
            $suffixes = array(' bytes', ' KB', ' MB', ' GB', ' TB');

            return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
        } else {
            return $size;
        }
    }
}
