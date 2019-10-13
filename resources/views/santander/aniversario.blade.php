@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Aniversário')


{{--  Page title  --}}
@section('page_title', 'Aniversário')

@section('page_title_html', '')
{{-- @section('page_search_html', '') --}}


{{--  Page Content  --}}
@section('content')
<div class="table-responsive">
  <h2>Aniverários Santander</h2>            
  <div class="clearfix"></div>          
  <table id="data_tables_simple_full" class="table table-hover">
    <thead>
      <tr>
        <th>Dia</th>
        <th>Valor</th>
        <th>Adicionado em</th>
        <th>Atualizado em</th>
      </tr>
    </thead>
    <tbody>
      @foreach($aniversarios as $aniversario)
      <tr>
          <th scope="row">{{$aniversario->data}}</th>
          <td class=" money_mask" >{{$aniversario->valor}}</td>
          <td>{{$aniversario->created_at->format('d/m/Y h:i:s')}}</td>
          <td>{{$aniversario->updated_at->format('d/m/Y h:i:s')}}</td>
      </tr> 
      @endforeach               
    </tbody>
  </table>       
</div>
@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
    
@endsection