@extends('gentelella.layouts.app')

@section('htmlheader_title', 'Detalhe Log de Importação')


{{--  Page title  --}}

@section('page_title', 'Detalhe Log de Importação')

{{--  Page Content  --}}
@section('content')
<div class="col-md-6 col-sm-6 col-xs-12">
  <div class="form-group">
    <label class="control-label col-md-3 col-sm-3 col-xs-12">SIZE </label>
      <div class="col-md-9 col-sm-9 col-xs-12">
        <input class="form-control" disabled="disabled" value="{{$log->size}}" type="text">
      </div>
  </div>
</div>
<div class="col-md-6 col-sm-6 col-xs-12">
    <div class="form-group">
      <label class="control-label col-md-5 col-sm-5 col-xs-12">Data de Importação </label>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <input class="form-control" disabled="disabled" value="{{$log->created_at->format('d/m/Y')}}" type="text">
        </div>
    </div>
</div>
<div class="row"></div>
<br> 
<br>
<div class="col-md-12 col-sm-12 col-xs-12">
  <div class="form-group">
    <label class="control-label col-md-12 col-sm-12 col-xs-12">LOG </label>
      <div class="col-md-12 col-sm-12 col-xs-12">
<pre>{!! str_replace('...', '...
', $log->log) !!}</pre>
      </div>
  </div>
</div>
@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
    
@endsection