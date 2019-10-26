<!-- PROFILE Dropdown Menu -->
<li class="nav-item dropdown">
    <a class="nav-link" data-toggle="dropdown" href="#">
        <i class="fas fa-id-badge"></i>
        {{-- <span class="badge badge-warning navbar-badge">15</span> --}}
    </a>
    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">        
        {{-- <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item">
        <i class="fas fa-envelope mr-2"></i> 4 new messages
        <span class="float-right text-muted text-sm">3 mins</span>
        </a>
        <div class="dropdown-divider"></div>
        <a href="#" class="dropdown-item">
        <i class="fas fa-users mr-2"></i> 8 friend requests
        <span class="float-right text-muted text-sm">12 hours</span>
        </a> --}}
        <div class="dropdown-divider"></div>
        <h6 class="dropdown-header">
            <i class="fas fa-cogs"></i>
            Configurações
        </h6>
        <a href="{{ route('config.dashboard.index') }}" class="dropdown-item">
            <i class="fas fa-border-style"> </i> Dashboard            
        </a>
        
        
        <div class="dropdown-divider"></div>
        <a href="{{ route('logout') }}" class="dropdown-item float-right dropdown-footer" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" >
            <span class="float-right" >    
                <i class="fas fa-sign-out-alt"></i>  Logout 
            </span>
        </a>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>
    </div>
</li>




