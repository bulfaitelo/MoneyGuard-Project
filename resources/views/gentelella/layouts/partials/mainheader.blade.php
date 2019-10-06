        <div class="top_nav">
            <div class="nav_menu">
            <nav>
                <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                </div>

                <ul class="nav navbar-nav navbar-right">
                <li class="">
                    <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="{{ Gravatar::get(Auth::user()->email) }}" alt=""> {{Auth::user()->name}}
                    <span class=" fa fa-angle-down"></span>
                    </a>
                    <ul class="dropdown-menu dropdown-usermenu pull-right">
                    <li><a href="javascript:;"> Profile</a></li>
                    <li>
                        <a href="javascript:;">
                        <span class="badge bg-red pull-right">50%</span>
                        <span>Settings</span>
                        </a>
                    </li>
                    <li><a href="javascript:;">Help</a></li>
                    <li>
                        <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <i class="fa fa-sign-out pull-right"></i> Logout
                        </a>
                    </li>
                       <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                           @csrf
                       </form>
                    </ul>
                </li>

                @include('gentelella.layouts.partials.presentation')
                
                </ul>
            </nav>
            </div>
        </div>