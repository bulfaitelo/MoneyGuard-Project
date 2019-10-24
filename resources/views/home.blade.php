@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Home')


{{--  Page title  --}}
{{-- @section('page_title', 'Home ') --}}

{{-- @section('page_title_html', '') --}}
@section('page_breadcrumb', '')

{{--  Page Content  --}}
@section('content')
<home-dash-small-graph></home-dash-small-graph>
{{-- <example-component></example-component> --}}

 






@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
@endsection