<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
    <div class="menu_section">
    <h3>General</h3>
    <ul class="nav side-menu">
        <li>                    
            <a ><i class="fa fa-home"></i> Home </a>
            {!! $mainMenu->asUl(['class' => 'nav child_menu']) !!}
        </li>
        <li>                    
            <a ><i class="fa fa-bar-chart"></i> Ativos </a>
            {!! $ativosMenu->asUl(['class' => 'nav child_menu']) !!}
        </li>
        <li>                    
            <a ><i class="fa fa-university"></i> Santander </a>
            {!! $santanderMenu->asUl(['class' => 'nav child_menu']) !!}
        </li>                 
        <li>                    
            <a ><i class="fa fa-exclamation-circle"></i> Logs </a>
            {!! $logsMenu->asUl(['class' => 'nav child_menu']) !!}
        </li>
        <li>                    
            <a ><i class="fa fa-cog"></i> Opções </a>
            {!! $parametrosMenu->asUl(['class' => 'nav child_menu']) !!}
        </li> 
    </ul> 
                       
        <h3>External Links</h3>
    <ul  class="nav side-menu">
        <li><a><i class="fa fa-edit"></i> Links <span class="fa fa-chevron-down"></span></a>
        {!! $externalLinks->asUl(['class' => 'nav child_menu']) !!}
        
        </li>                
    </ul>
    </div>
</div>