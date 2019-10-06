<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();

        // TESOURO DIRETO
        $schedule->command('tesouro:extrato')
        // ->everyMinute();
        ->weekdays()
        ->hourly()
        ->between('10:00', '13:00');

        // TESOURO DIRETO PREÇOS TAXAS
        $schedule->command('tesouro:preco')
        // ->everyMinute();
        ->weekdays()
        ->hourly()
        ->between('10:30', '13:30');

        // TESOURO DIRETO PROTOCOLOS INVESTIMENTOS e Resgates
        $schedule->command('tesouro:protocolo')        
        // ->everyMinute();
        ->weekdays()
        ->hourly()
        ->between('14:00', '18:00');        

        // SANTANDER
        // $schedule->command('bank:santander')
        // ->everyMinute();
       // ->weekdays()
      //  ->hourly()
      //  ->between('06:00', '09:00');

         // Sql Backup
        $schedule->command('db:backup')
        // ->everyMinute();
        ->weekly()
        ->sundays()
        ->at('12:00');

        $schedule->exec('killall -9 firefox')
        ->dailyAt('00:00')
        ->appendOutputTo(storage_path("logs/Firefox.log"));  
         

         
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
