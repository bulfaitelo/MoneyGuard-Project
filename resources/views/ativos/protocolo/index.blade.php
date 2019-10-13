@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Protocolos')


{{--  Page title  --}}
@section('page_title', 'Protocolos')
{{-- @section('page_title_html', '') --}}
@section('page_search_html')


<div class="col-sm-6">
  <div class="input-group">
    <span class="input-group-btn">      
        <button type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="fa fa-filter"></span>
        </button>
        <div style="width: 285px; padding: 10px;" class="dropdown-menu dropdown-menu-left pull-left" role="menu">
            {!! Form::open(['route'=>'ativos.protocolos.index', 'method'=>'get', 'class'=>'form-horizontal form-label-left']) !!}                
              <div class="form-group">
                <label for="filter">Títulos</label>
                {!! Form::select('titulo', \App\Models\Parametros\Titulos::orderBy('nome_titulo')->pluck('nome_titulo', 'id'), $request->input('titulo'), ['placeholder' => 'Selecione o Representante', 'class'=> 'form-control']) !!} 
              </div>
              <div class="form-group">
                  <label for="filter">Operação</label>
                  {!! Form::select('operacao', \App\Models\Parametros\Operacao::pluck('nome_operacao', 'id'), $request->input('operacao'), ['placeholder' => 'Selecione o Tipo de Operacão', 'class'=> 'form-control']) !!} 
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

@if($protocolos)

<div class="table-responsive">
    <table data-order="[[ 0, &quot;desc&quot; ]]" id="data_tables_simple_full" class="table table-striped jambo_table bulk_action">
      <thead>
        <tr class="headings">                    
          <th class="column-title">Protocolo</th>
          <th class="column-title">Título</th>          
          <th class="column-title">Operação</th>          
          <th class="column-title">Liquidação</th>
          <th class="column-title">Representante</th>
          <th class="column-title">Valor Unitario</th>
          <th class="column-title">Taxa de Juros</th>
          <th class="column-title">Valor Total</th>
          <th class="column-title"></th>
        </tr>
      </thead>

      <tbody>
        @forelse ($protocolos as $protocolo)
        <tr class="even pointer">          
            <td class=" "><b>{{$protocolo->protocolo}}</b></td>
            <td class=" ">
              <a href="{{ route('ativos.precos.show', $protocolo->titulo->id)}}" target="_blank">
                {{$protocolo->titulo->nome()}}</td>
              </a>
            <td class=" "><b>{{$protocolo->operacao->nome_operacao}}</b></td>            
            <td data-order="{{$protocolo->data_liquidacao('US')}}" class=" "><b>{{$protocolo->data_liquidacao()}}</b></td>           
            <td class=""><b>{{$protocolo->representante->nome_representante}}</b></td>
            <td class=" money_mask">{{$protocolo->valor_unitario}}</td>
            <td class=" ">{{$protocolo->taxa_juros}}%</td>
            <td class=" money_mask">{{$protocolo->valor_total}}</td>            
            <td>                
                <a class="btn btn-default" style="float:right" title="Detalhes" href="{{ route('ativos.protocolos.show', $protocolo->id) }}">
                    <i class="fa fa-pie-chart"></i>
                </a>  
                <a class="btn btn-default" style="float:right" title="Correção" href="{{ route('ativos.protocolos.edit', $protocolo->id) }}">
                  <i class="fa fa-exclamation"></i>
              </a>                             
             </div>
            </td>       
        </tr>
        @empty
        <tr>
          <td>
            <h4>Ainda Não a Registros!</h4>
          </td>
        </tr>
        @endforelse        
      </tbody>
    </table>
  </div>
  {{-- /listar usuarios --}}             
  {{$protocolos->links() }}
@endif
@endsection

{{--  Optional script Blades  --}}
@section('script_blade')

@endsection