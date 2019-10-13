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

            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Demo Gentelella')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://colorlib.com/polygon/gentelella/index.html')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);
                $m->add('Gentelella Git')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://github.com/puikinsh/gentelella')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);
                $m->add('Gentelella Documentation')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://puikinsh.github.io/gentelella/')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);
                $m->add('Laravel Menu')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://github.com/lavary/laravel-menu#links-href-property')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);
                $m->add('jQuery Sparklines')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://omnipotent.net/jquery.sparkline/#s-about')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);
                $m->add('Chartjs')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('http://www.chartjs.org/')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);            
                $m->add('Date Range Picker')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('http://www.daterangepicker.com/#ex5')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);            
                $m->add('Data Tables')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://datatables.net')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);            
            });
            
        });

        \Menu::make('mainMenu', function ($menu) {
            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Home', 'home')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->add('test', 'test')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);               
            });
        });

        \Menu::make('ativosMenu', function ($menu) {
            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Home', ['route' =>'index'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->add('Analítico', ['route' =>'analitico.index'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->add('Protocolos', [ 'route' => 'protocolos.index'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->add('Preços', [ 'route' => 'precos.index'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
            });
        });

        \Menu::make('santanderMenu', function ($menu) {
            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Home', ['route'=> 'santander.index'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->add('Aniversário', ['route'=> 'santander.aniversario'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->add('Movimentação', ['route'=> 'santander.movimentacao'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
            });
        });

        

        \Menu::make('logsMenu', function ($menu) {
            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Importação', ['route'=>'logs.import'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->add('Backup', ['route'=>'logs.backup'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
            });
        });
        \Menu::make('parametrosMenu', function ($menu) {
            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Títulos', [ 'route' => 'titulo.index'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->add('Schedule', [ 'route' => 'schedule.index'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
            });
        });
        
    
        return $next($request);
    }
}
