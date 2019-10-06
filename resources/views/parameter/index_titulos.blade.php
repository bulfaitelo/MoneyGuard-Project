@extends('gentelella.layouts.app')

@section('htmlheader_title', 'Titulos')


{{--  Page title  --}}
@section('page_title', 'Titulos')

{{--  Page Content  --}}
@section('content')
@if($titulos)
<div class="table-responsive">
    <table class="table table-striped jambo_table bulk_action">
      <thead>
        <tr class="headings">                    
          <th class="column-title">Nome</th>
          <th class="column-title">Nome Exibição</th>
          <th class="column-title">Vencimento</th>
          <th class="column-title">Data Criação</th>
          <th class="column-title">Cor</th>
          <th class="column-title"></th>
        </tr>
      </thead>

      <tbody>
        @foreach($titulos as $titulo)
        <tr class="even pointer">          
            <td class=" "><b>{{$titulo->nome_titulo}}</b></td>
            <td class=" ">{{$titulo->nome_exibicao}}</td>
            <td class=" ">{{$titulo->data_vencimento->format('d/m/Y')}}</td>
            <td class=" ">{{$titulo->created_at->format('d/m/Y h:i:s')}}</td>
            <td class=" ">
              <div style="background:{{$titulo->back_color}}; width: 20px; height: 20px;  margin: 3px; border: 1px solid rgba(0, 0, 0, .2);  float:left; " ></div>
              <div style="background:{{$titulo->border_color}}; width: 20px; height: 20px;  margin: 3px; border: 1px solid rgba(0, 0, 0, .2); float:left; " ></div>
            </td>            
            <td>
                <a class="btn btn-default" title="Detalhes" href="{{ route('titulo.edit', $titulo->id) }}">
                    <i class="fa fa-edit"></i>
                </a>
            </td>       
        </tr>
        @endforeach        
      </tbody>
    </table>
  </div>
  {{-- /listar usuarios --}}             
  {{$titulos->links() }}
@endif
@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
    
@endsection