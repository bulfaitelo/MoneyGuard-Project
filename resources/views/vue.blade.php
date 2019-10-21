@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Home')


{{--  Page title  --}}
@section('page_title', 'HOME')

{{-- @section('page_title_html', '') --}}
{{-- @section('page_search_html', '') --}}

{{--  Page Content  --}}
@section('content')


{{-- <chart-vue></chart-vue> --}}


<TrendChart
  :datasets="[
    {
      data: [10, 50, 20, 100, 40, 60, 80],
      smooth: true,
      fill: true
    }
  ]"
  :grid="{
     verticalLines: true,
     horizontalLines: true
  }"
  :labels="{
     xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
     yLabels: 5
  }" 
  :min="0">
</TrendChart>






@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
<script>

</script>
@endsection