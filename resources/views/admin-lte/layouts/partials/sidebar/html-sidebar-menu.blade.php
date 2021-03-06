<!-- sidebar-menu -->
<nav class="mt-2">
<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">    
@if (explode("/", \Route::current()->action['prefix'])[0] == "config")
    @foreach($ConfigMenu->all() as $item)  
    @if($item->hasChildren())
        <li @if($item->hasChildren())  @endif class="nav-item has-treeview @if($item->link->isActive) menu-open @endif ">    
            <a @lm_attrs($item->link) class="nav-link" @lm_endattrs href="{!! $item->url() !!}"  >                  
                {!! $item->title !!} 
                    <i class="right fas fa-angle-left "></i>                
                </p>
            </a>
            <ul class="nav nav-treeview" >
            @foreach ($item->children() as $subitem)
                
                <li class="nav-item">
                    <a @lm_attrs($subitem->link) class="nav-link  @if($subitem->link->isActive) active @endif" @lm_endattrs href="{!! $subitem->url() !!}">
                        {!!$subitem->title!!}
                        </p>
                    </a>
                </li>
            @endforeach
            </ul>            
        </li>
    @endif
    @endforeach 
@else
    @foreach($MainMenu->all() as $item)  
        @if($item->hasChildren())
            <li @if($item->hasChildren())  @endif class="nav-item has-treeview @if($item->link->isActive) menu-open @endif ">    
                <a @lm_attrs($item->link) class="nav-link" @lm_endattrs href="{!! $item->url() !!}"  >                  
                    {!! $item->title !!} 
                        <i class="right fas fa-angle-left "></i>                
                    </p>
                </a>
                <ul class="nav nav-treeview" >
                @foreach ($item->children() as $subitem)
                    
                    <li class="nav-item">
                        <a @lm_attrs($subitem->link) class="nav-link  @if($subitem->link->isActive) active @endif" @lm_endattrs href="{!! $subitem->url() !!}">
                            {!!$subitem->title!!}
                            </p>
                        </a>
                    </li>
                @endforeach
                </ul>            
            </li>
        @endif
    @endforeach
@endif
<!-- /.sidebar-menu -->
</ul>
</nav>