<li role="presentation" class="dropdown">
    <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
        <i class="fa fa-envelope-o"></i>
        <span class="badge bg-green">{{count(SideBarLog::SidebarLog())}}</span>
    </a>
    <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
    @foreach(SideBarLog::SidebarLog() as $list)
        @if($list->categoria_importacao)
        <li>
            <a href="{{ route('logs.import.show', $list->id) }}">
                <span class="image"><img src="{{ Gravatar::get(Auth::user()->email) }}" alt="Profile Image" /></span>
                <span>
                    <span>{{$list->categoria_importacao}}</span>
                    
                </span>
                <span class="message"> 
                    <span class="label label-danger pull-left">{{$list->tipo_erro}}</span>
                    <span class="time">{{$list->created_at->format('d/m/Y H:i:s')}}</span>
                </span>
            </a>
        </li>
        @else
        <li>
            <a href="{{ route('logs.backup.show', $list->id) }}">
            <span class="image"><img src="{{ Gravatar::get(Auth::user()->email) }}" alt="Profile Image" /></span>
            <span>
                <span>SQL Backup</span>
                <span class="time">{{$list->created_at->format('d/m/Y H:i:s')}}</span>
            </span>
            <span class="message"> 
                {{$list->size}}        
            </span>                 
            </a>
        </li>
        @endif
    @endforeach
        <li>
            <div class="text-center">
            <a href="{{ route('logs.import') }}">
                <strong>Veja todos os alertas </strong>
                <i class="fa fa-angle-right"></i>
            </a>
            </div>
        </li>
    </ul>
</li>