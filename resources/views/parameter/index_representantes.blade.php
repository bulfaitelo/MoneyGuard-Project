@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Representantes')


{{--  Page title  --}}
@section('page_title', 'Representantes')

{{--  Page Content  --}}
@section('content')



@if($representantes)

<div class="card">

    <!-- /.card-header -->
    <div class="card-body">
      <table id="representantes" class="table table-bordered table-striped">
        <thead>
        <tr>
            <th>Nome</th>
            <th>Nome Exibição</th>         
            <th>Cor</th>            
            <th></th>
        </tr>
        </thead>
        <tbody>
            @foreach($representantes as $representante)
            <tr class="even pointer">          
                <td class=" "><b>{{$representante->nome_representante}}</b></td>
                <td class=" ">{{$representante->nome_exibicao}}</td>                           
                <td class=" ">
                  <div style="background:{{$representante->back_color}}; width: 20px; height: 20px;  margin: 3px; border: 1px solid rgba(0, 0, 0, .2);  float:left; " ></div>
                  <div style="background:{{$representante->border_color}}; width: 20px; height: 20px;  margin: 3px; border: 1px solid rgba(0, 0, 0, .2); float:left; " ></div>
                </td>            
                <td>
                    <a class="btn btn-default" title="Detalhes" href="{{ route('representante.edit', $representante->id) }}">
                        <i class="fa fa-edit"></i>
                    </a>
                </td>       
            </tr>
            @endforeach 
        </tbody>
      </table>
    </div>
  </div>
          
{{$representantes->links() }}
@endif

@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
<script>
  $(function () { 
  $('#representantes').DataTable({
    "paging": false,
    "lengthChange": false,
    "searching": true,
    "ordering": true,
    "info": false,
    "autoWidth": false,
  });
});

</script>
@endsection