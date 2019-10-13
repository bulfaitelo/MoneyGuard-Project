@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Ativos Analítico')


{{--  Page title  --}}
@section('page_title', 'Ativos Analítico')
{{-- @section('page_title_html', '') --}}
@section('page_search_html')


<div class="col-sm-6">
  <div class="input-group">
    <span class="input-group-btn">      
        <button type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="fa fa-filter"></span>
        </button>
        <div style="width: 285px; padding: 10px;" class="dropdown-menu dropdown-menu-left pull-left" role="menu">
            {!! Form::open(['route'=>'analitico.index', 'method'=>'get', 'class'=>'form-horizontal form-label-left']) !!}                
              <div class="form-group">
                <label for="filter">Títulos</label>
                {!! Form::select('titulo', \App\Models\Parametros\Titulos::orderBy('nome_titulo')->pluck('nome_titulo', 'id'), $request->input('titulo'), ['placeholder' => 'Selecione o Representante', 'class'=> 'form-control']) !!} 
              </div>              
              <div class="form-group">
                  <label for="filter">Representante</label>
                  {!! Form::select('representante', \App\Models\Parametros\Representantes::pluck('nome_representante', 'id'), $request->input('representante'), ['placeholder' => 'Selecione o Representante', 'class'=> 'form-control']) !!} 
              </div>              
              <button style="width: 265px;" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>            
        </div>     
      </span>
    <input id="default_search_input" name="protocolo" class="form-control" type="text" placeholder="Buscar pelo item na tabela">
      <span class="input-group-btn">
      <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
    </span>
    {!! Form::close() !!} 
  </div>
</div>

@endsection

{{--  Page Content  --}}
@section('content')
{{-- <td>{{$ativo->representante->nome_representante}}</td>     --}}

<div class="col-md-12 col-sm-12 col-xs-12 table-responsive">
  <div class="x_content">   
    <table id="data_tables_full" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Valor Investido</th>
          <th>Valor Bruto</th>            
          <th>Rendimento</th>
          <th>Vencimento</th>
          <th>Ultima Atualização</th>
        </tr>
      </thead>
      <tbody>
      @foreach($ativos as $ativo)      
        <tr>
          <td>
            <a href="{{ route('analitico.show', $ativo->titulo_id)}}">
              <b>{{$ativo->titulo->nome()}}</b>
            </a>
          </td>
          <td class="money_mask" >{{$ativo->valor_investido}}</td>
          <td class="money_mask" >{{$ativo->valor_bruto_atual}}</td>
          <td class="" ><b>{{@number_format($ativo->valor_bruto_atual / $ativo->valor_investido, 2, '.', '')}}%</b></td>     
          <td>{{$ativo->titulo->data_vencimento->format('d/m/Y')}}</td>
          <td>{{$ativo->created_at->format('d/m/Y')}}</td>     
           
        </tr>
      @endforeach
      </tbody>
    </table>
  </div>
</div>

@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
<script>  

$(document).ready( function () {
  var table =  $('#data_tables_full').DataTable({
    paging: false,
    searching: true,
    dom: 't'
  });
  // #myInput is a <input type="text"> element
  $('#default_search_input').on( 'keyup', function () {
      table.search( this.value ).draw();
  });
});

// $('#example').DataTable();
 
</script>
@endsection