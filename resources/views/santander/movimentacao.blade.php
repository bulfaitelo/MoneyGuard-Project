@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Movimentação')


{{--  Page title  --}}
@section('page_title', 'Movimentação')

@section('page_title_html', '')
{{-- @section('page_search_html', '') --}}


{{--  Page Content  --}}
@section('content')
<div class="table-responsive">
  <h2>Movimentação Santander</h2>            
  <div class="clearfix"></div>
  <table id="data_tables_simple_full" class="table table-hover">
    <thead>
      <tr>
        <th>N. Documento</th>                  
        <th>Dia</th>
        <th>Histórico</th>
        <th>Saldo</th>                  
        <th style="text-align:right" >Valor Movimentação</th>                  
      </tr>
    </thead>
    <tbody>
      @foreach($movimentacao as $movimentacao_dia)
      <tr>
        <td>{{$movimentacao_dia->documento}}</td>                    
        <td>{{$movimentacao_dia->data->format('d/m/Y')}}</td>
        <td>{{$movimentacao_dia->historico}}</td>                    
        <td class=" money_mask" >{{$movimentacao_dia->saldo}}</td>                    
        <td class=" " style="text-align:right">{{$movimentacao_dia->valor_movimento}}</td>                    
      </tr> 
      @endforeach               
    </tbody>
  </table>    
</div>
@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
    
@endsection