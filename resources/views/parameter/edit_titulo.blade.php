@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Editar: '.$titulo->nome_titulo)


{{--  Page title  --}}

@section('page_title', 'Editar: '.$titulo->nome_titulo)

{{--  Page Content  --}}
@section('content')
<div class="card card-info">
  {!! Form::open(['route'=>['titulo.update',$titulo->id], 'method'=>'put', 'class'=> '']) !!}
  <div class="card-header">
    <h3 class="card-title">Editar Titulo</h3>
  </div>
  <div class="card-body">
    <!-- Color Picker -->
    <div class="form-group">
      <label>Nome Exibição</label>
      <input name="nome_exibicao" value="{{ @$titulo->nome_exibicao }}" type="text" class="form-control my-colorpicker1">
    </div>
    <!-- /.form group -->

    <!-- Color Picker -->
    <div class="form-group">
      <label>Cor de Fundo</label>
      <div class="input-group cor-fundo">
        <input name="back_color" value="{{ @$titulo->back_color }}" data-color="{{ @$titulo->back_color }}" type="text" class="form-control">
        <div class="input-group-append">
            <span class="input-group-text colorpicker-input-addon"><i></i></span>
        </div>
      </div>
      <!-- /.input group -->
    </div>
    <!-- Color Picker -->
    <div class="form-group">
      <label>Cor de Borda</label>
      <div class="input-group cor-borda">
        <input name="border_color" value="{{ @$titulo->border_color }}" data-color="{{ @$titulo->border_color }}" type="text" class="form-control">
        <div class="input-group-append">
            <span class="input-group-text colorpicker-input-addon"><i></i></span>
        </div>
      </div>
      <!-- /.input group -->
    </div>
   
  </div>
  <div class="card-footer">
    <button type="submit" class="btn btn-primary float-right">Salvar</button>
  </div>
  <!-- /.card-body -->
  {!! Form::close() !!}
</div>
@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
<script>
  $(function () {
    $('.cor-fundo, .cor-borda').colorpicker({
      format: "rgb"
    }) 
  });
</script>
    
@endsection