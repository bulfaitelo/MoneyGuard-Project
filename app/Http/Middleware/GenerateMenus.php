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
        \Menu::make('test', function ($menu) {            
            // HOME
            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Home', '#')->prepend('<i class="nav-icon fas fa-home text-success" ></i>')
                ->link->attr(['class'=> 'nav-link']);
                $m->home->add('Home', 'home')->prepend('<i class="far fa-circle nav-icon text-success" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->home->add('test', 'test')->prepend('<i class="far fa-circle nav-icon text-success" > </i>')
                    ->link->attr(['class'=> 'nav-link']);               

            });
            // ATIVOS
            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Ativos', '#')->prepend('<i class="nav-icon fas fa-chart-bar text-info" ></i>')
                ->link->attr(['class'=> 'nav-link']);
                $m->ativos->add('Dashboard', ['route' => 'ativos.dashboard.index'])->prepend('<i class="far fa-circle nav-icon text-info" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->ativos->add('Analítico', ['route' => 'ativos.analitico.index'])->prepend('<i class="far fa-circle nav-icon text-info" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->ativos->add('Protocolos', [ 'route' => 'ativos.protocolos.index'])->prepend('<i class="far fa-circle nav-icon text-info" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->ativos->add('Preços', [ 'route' => 'ativos.precos.index'])->prepend('<i class="far fa-circle nav-icon text-info" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
            });
            // SANTANDER
            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Santander', '#')->prepend('<i class="nav-icon fas fa-university text-danger" ></i>')
                ->link->attr(['class'=> 'nav-link']);
                $m->santander->add('Home', ['route'=> 'santander.index'])->prepend('<i class="far fa-circle nav-icon text-danger" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->santander->add('Aniversário', ['route'=> 'santander.aniversario'])->prepend('<i class="far fa-circle nav-icon text-danger" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->santander->add('Movimentação', ['route'=> 'santander.movimentacao'])->prepend('<i class="far fa-circle nav-icon text-danger" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
            });
            // LOGS
            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Logs', '#')->prepend('<i class="nav-icon fas fa-exclamation-circle" ></i>')
                ->link->attr(['class'=> 'nav-link']);
                $m->logs->add('Importação', ['route'=>'logs.import'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->logs->add('Backup', ['route'=>'logs.backup'])->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
            });

            // Parametros
            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Parametros', '#')->prepend('<i class="nav-icon fas fa-cog text-warning" ></i>')
                ->link->attr(['class'=> 'nav-link']);
                $m->parametros->add('Títulos', [ 'route' => 'titulo.index'])->prepend('<i class="far fa-circle nav-icon text-warning" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
                $m->parametros->add('Schedule', [ 'route' => 'schedule.index'])->prepend('<i class="far fa-circle nav-icon text-warning" > </i>')
                    ->link->attr(['class'=> 'nav-link']);
            });     

            // Exeternal Links
            $menu->group(['class'=> 'nav-item'], function ($m){
                $m->add('Links', '#')->prepend('<i class="nav-icon fas fa-edit" ></i>')
                ->link->attr(['class'=> 'nav-link']);
                $m->links->add('Demo Gentelella')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://colorlib.com/polygon/gentelella/index.html')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);
                $m->links->add('Gentelella Git')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://github.com/puikinsh/gentelella')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);
                $m->links->add('Gentelella Documentation')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://puikinsh.github.io/gentelella/')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);
                $m->links->add('Laravel Menu')->prepend('<i class="fab fa-github-alt nav-icon" > </i>')
                    ->link->href('https://github.com/lavary/laravel-menu#links-href-property')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);
                $m->links->add('jQuery Sparklines')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://omnipotent.net/jquery.sparkline/#s-about')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);
                $m->links->add('Chartjs')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('http://www.chartjs.org/')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);            
                $m->links->add('Date Range Picker')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('http://www.daterangepicker.com/#ex5')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);            
                $m->links->add('Data Tables')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://datatables.net')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);                   
                $m->links->add('adminLTE')->prepend('<i class="far fa-circle nav-icon" > </i>')
                    ->link->href('https://adminlte.io/themes/dev/AdminLTE/index2.html ')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);    
                $m->links->add('Git adminLTE')->prepend('<i class="fab fa-github-alt nav-icon" > </i>')
                    ->link->href('https://github.com/ColorlibHQ/AdminLTE ')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);         
                $m->links->add('Axios')->prepend('<i class="fab fa-github-alt nav-icon" > </i>')
                    ->link->href('https://github.com/axios/axios')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);      
                $m->links->add('Vue JS')->prepend('<i class="fab fa-vuejs nav-icon" > </i>')
                    ->link->href('https://vuejs.org/v2/guide/installation.html')
                    ->attr(['target' => '_blank', 'class' => 'nav-link']);                     
            });

        });    
        return $next($request);
    }
}
