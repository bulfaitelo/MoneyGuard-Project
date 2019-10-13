@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Preços Titulos')


{{--  Page title  --}}
{{-- @section('page_title', 'HOME') --}}

{{-- @section('page_title_html', '') --}}
{{-- @section('page_search_html', '') --}}

{{--  Page Content  --}}
@section('content')


<div class="col-md-12 col-sm-12 col-xs-12 table-responsive">
  <div class="x_content">   
    <table id="data_tables_full" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Vencimento</th>
          <th>Taxa de Rendimento (% a.a.)</th>
          <th>Valor Mínimo</th>
          <th>Preço Unitário</th>          
        </tr>
      </thead>
      <tbody>
      @foreach($precos as $preco)        
        <tr>
          <td>
            <a href="{{ route('ativos.precos.show', $preco->titulo_id)}}">
              {{$preco->titulo->nome_titulo}}
            </a>
          </td>
          <td>{{$preco->titulo->data_vencimento->format('d/m/Y')}}</td>
          <td>{{$preco->taxa_rendimento}}</td>
          <td>{{$preco->valor_minimo}}</td>
          <td>{{$preco->preco_unitario}}</td>
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