<!-- sidebar-menu -->
<nav class="mt-2">
    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- Add icons to the links using the .nav-icon class
            with font-awesome or any other icon font library -->
    <li class="nav-item has-treeview menu-open">
        <a href="#" class="nav-link active">
            <i class="nav-icon fas fa-home"></i>
            <p> Home <i class="right fas fa-angle-left "></i></p>
        </a>
        {!! $mainMenu->asUl(['class' => 'nav nav-treeview']) !!}            
    </li>
    
    <li class="nav-item has-treeview">
        <a href="#" class="nav-link">
            <i class="nav-icon fas fa-chart-bar"></i>
            <p> ATIVOS <i class="right fas fa-angle-left "></i></p>
        </a>        
        {!! $ativosMenu->asUl(['class' => 'nav nav-treeview']) !!}
    </li>

    <li class="nav-item has-treeview">
        <a href="#" class="nav-link">
            <i class="nav-icon fas fa-university"></i>
            <p> SANTANDER <i class="right fas fa-angle-left "></i></p>
        </a>        
        {!! $santanderMenu->asUl(['class' => 'nav nav-treeview']) !!}
    </li>

    <li class="nav-item has-treeview">
        <a href="#" class="nav-link">
            <i class="nav-icon fas fa-exclamation-circle"></i>
            <p> LOGS <i class="right fas fa-angle-left "></i></p>
        </a>        
        {!! $logsMenu->asUl(['class' => 'nav nav-treeview']) !!}
    </li>

    <li class="nav-item has-treeview">
        <a href="#" class="nav-link">
            <i class="nav-icon fas fa-cog"></i>
            <p> OPÇÕES <i class="right fas fa-angle-left "></i></p>
        </a>        
        {!! $parametrosMenu->asUl(['class' => 'nav nav-treeview']) !!}
    </li>

    <li class="nav-header">LINKS ÚTEIS</li>
    <li class="nav-item has-treeview">
        <a href="#" class="nav-link">
            <i class="nav-icon fas fa-edit"></i>
            <p> LINKS <i class="right fas fa-angle-left "></i></p>
        </a>        
        {!! $externalLinks->asUl(['class' => 'nav nav-treeview']) !!}
    </li>


    
</nav>
<!-- /.sidebar-menu -->