@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Configurações / Dashboard')


{{--  Page title  --}}
@section('page_title', 'Configurações / Dashboard')

{{-- @section('page_title_html', '') --}}
{{-- @section('page_search_html', '') --}}

{{--  Page Content  --}}
@section('content')
<div class="card card-primary">
  <div class="card-header">
    <h3 class="card-title">Dashboard Topo</h3>
    <div class="card-tools">
      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
      <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-remove"></i></button>
    </div>
  </div>
  {{-- FORM ERRO --}}
  @include('admin-lte.layouts.form-erro')
  <!-- /.card-header -->
  <div class="card-body">
    {!! Form::open(['route' => ['config.dashboard.store']]) !!}
    <div class="row">
      <div class="col-12">
          <div class="form-group">
            <label>Selecione os itens que irão aparecer no topo da Dashboard da homepage</label>
            {!! Form::select('dashboard_graph[]', $representantes, @$user_representantes, ['class'=> 'duallistbox', 'multiple' => 'multiple']) !!}            
          </div>
          <!-- /.form-group -->         
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
    <button type="submit" class="btn btn-primary float-right">Atualizar</button>
  </div>
  {!! Form::close() !!}
  <!-- /.card-body -->
</div>

@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
    <script>
    //Bootstrap Duallistbox
    $('.duallistbox').bootstrapDualListbox()
    </script>
@endsection


