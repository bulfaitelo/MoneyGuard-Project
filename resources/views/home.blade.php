@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Home')


{{--  Page title  --}}
@section('page_title', 'HOasdsdME')

{{-- @section('page_title_html', '') --}}
{{-- @section('page_search_html', '') --}}

{{--  Page Content  --}}
@section('content')

{{-- {{dd(Menu::get('test')->all())}} --}}


{{-- <nav class="mt-2">
    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item has-treeview menu-open">      
            {!! $test->asUl(['class' => 'nav nav-treeview']) !!}
            </li>
    </ul>
</nav> --}}



{{-- <!-- sidebar-menu -->
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
    </ul>
</nav> --}}

{{-- <i class="nav-icon fas fa-home"></i> --}}
{{-- {{dd($test->all())}} --}}

<br>
{{-- {!! dd( $test->all()) !!} --}}
<br>




@foreach($test->all() as $item)
{{-- @foreach($items as $item) --}}
  <li @lm_attrs($item) @if($item->hasChildren()) class="nav-item dropdown" @endif @lm_endattrs>
    @if($item->link) <a @lm_attrs($item->link) @if($item->hasChildren()) class="nav-link dropdown-toggle " role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @else class="nav-link" @endif @lm_endattrs href="{!! $item->url() !!}">
      {!! $item->title !!}
      @if($item->hasChildren()) <b class="caret"></b> @endif
    </a>
    @else
      <span class="navbar-text">{!! $item->title !!}</span>
    @endif
    @if($item->hasChildren())
      <ul class="dropdown-menu">
        {{-- @include(config('laravel-menu.views.bootstrap-items'),array('items' => $item->children())) --}}
      </ul>
    @endif
  </li>
  @if($item->divider)
  	<li {!! Lavary\Menu\Builder::attributes($item->divider) !!}></li>
  @endif
@endforeach

</ul>




@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
    
@endsection