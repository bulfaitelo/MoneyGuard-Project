<?php

namespace App\Http\Middleware;

use Closure;

class GenerateMenus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        \Menu::make('externalLinks', function ($menu) {
            $menu->add('Demo Gentelella')->link->href('https://colorlib.com/polygon/gentelella/index.html')->attr(['target' => '_blank']);
            $menu->add('Gentelella Git')->link->href('https://github.com/puikinsh/gentelella')->attr(['target' => '_blank']);
            $menu->add('Gentelella Documentation')->link->href('https://puikinsh.github.io/gentelella/')->attr(['target' => '_blank']);
            $menu->add('Laravel Menu')->link->href('https://github.com/lavary/laravel-menu#links-href-property')->attr(['target' => '_blank']);
            $menu->add('jQuery Sparklines')->link->href('https://omnipotent.net/jquery.sparkline/#s-about')->attr(['target' => '_blank']);
            $menu->add('Chartjs')->link->href('http://www.chartjs.org/')->attr(['target' => '_blank']);            
            $menu->add('Date Range Picker')->link->href('http://www.daterangepicker.com/#ex5')->attr(['target' => '_blank']);            
            $menu->add('Data Tables')->link->href('https://datatables.net')->attr(['target' => '_blank']);            
            
        });

        \Menu::make('mainMenu', function ($menu) {
            $menu->add('Home', 'home');
            $menu->add('test', 'test');
        });

        \Menu::make('ativosMenu', function ($menu) {
            $menu->add('Home', ['route' =>'index']);
            $menu->add('Analítico', ['route' =>'analitico.index']);
            $menu->add('Protocolos', [ 'route' => 'protocolos.index']);
            $menu->add('Preços', [ 'route' => 'precos.index']);
        });

        \Menu::make('santanderMenu', function ($menu) {
            $menu->add('Home', ['route'=> 'santander.index']);
            $menu->add('Aniversário', ['route'=> 'santander.aniversario']);
            $menu->add('Movimentação', ['route'=> 'santander.movimentacao']);
        });

        

        \Menu::make('logsMenu', function ($menu) {
            $menu->add('Importação', ['route'=>'logs.import']);
            $menu->add('Backup', ['route'=>'logs.backup']);
        });
        \Menu::make('parametrosMenu', function ($menu) {
            $menu->add('Títulos', [ 'route' => 'titulo.index']);
            $menu->add('Schedule', [ 'route' => 'schedule.index']);

        });
        
    
        return $next($request);
    }
}
