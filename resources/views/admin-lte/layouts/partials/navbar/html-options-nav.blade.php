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
        <a class="dropdown-item" title="Logout" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" >
        <p>  <i class="fas fa-sign-out-alt"></i>  Logout </p>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>
        </a>
        <div class="dropdown-divider"></div>
        
    </div>
</li>