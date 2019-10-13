@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Editar: '.$titulo->nome_titulo)


{{--  Page title  --}}

@section('page_title', 'Editar: '.$titulo->nome_titulo)

{{--  Page Content  --}}
@section('content')
<div class="col-md-8 col-sm-12 col-xs-12">
  <div class="x_panel">
    <div class="x_title">
      <h2>Editar Titulo: </h2>
      <div class="clearfix"></div>
    </div>
    <div class="x_content">
      <br>
      {!! Form::open(['route'=>['titulo.update',$titulo->id], 'method'=>'put', 'class'=> 'form-horizontal form-label-left']) !!}
      
        <div class="form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12">Nome Exibição </label>
          <div class="col-md-9 col-sm-9 col-xs-12">
            <input name="nome_exibicao" class="form-control" value="{{$titulo->nome_exibicao}}" type="text">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12">Cor Fundo</label>
          <div class="col-md-9 col-sm-9 col-xs-12">
            <div class="input-group demo2 colorpicker-element">
              <input name="back_color" value="{{$titulo->back_color}}" class="form-control" type="text">
              <span class="input-group-addon"><i style="background-color: {{$titulo->back_color}};"></i></span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-3 col-sm-3 col-xs-12">Cor Borda</label>
          <div class="col-md-9 col-sm-9 col-xs-12">
            <div class="input-group demo2 colorpicker-element">
              <input name="border_color" value="{{$titulo->border_color}}" class="form-control" type="text">
              <span class="input-group-addon"><i style="background-color: {{$titulo->border_color}};"></i></span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-9 col-md-offset-3">            
            <button type="submit" class="btn btn-success">Salvar</button>
          </div>
        </div>
        {!! Form::close() !!}
    </div>
  </div>
</div>
@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
    
@endsection