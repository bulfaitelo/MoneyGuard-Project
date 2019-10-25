@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Home')


{{--  Page title  --}}
{{-- @section('page_title', 'Home ') --}}

{{-- @section('page_title_html', '') --}}
@section('page_breadcrumb', '')

{{--  Page Content  --}}
@section('content')
{{-- DASHBOARD --}}
<home-dash-small-graph></home-dash-small-graph>
<div class="row">
    <div class="col-md-9">
        asdasdsd
    </div>
    <div class="col-md-3">
        <home-dash-month-info></home-dash-month-info>
    </div>
</div>
 







@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
@endsection