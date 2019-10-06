@extends('gentelella.layouts.app')

@section('htmlheader_title', 'Log de Backup SQL')


{{--  Page title  --}}
@section('page_title', 'Log de Backup SQL')

{{--  Page Content  --}}
@section('content')
@if($logs)
<div class="table-responsive">
    <table class="table table-striped jambo_table bulk_action">
      <thead>
        <tr class="headings">                    
          <th class="column-title">Tamanho</th>
          <th class="column-title">Data importação</th>
          <th class="column-title"></th>                  
        </tr>
      </thead>

      <tbody>
        @foreach($logs as $log)
        <tr class="even pointer">          
            <td class=" ">{{$log->size}}</td>
            <td class=" ">{{$log->created_at->format('d/m/Y H:i:s')}}</td>
            <td>
                <a class="btn btn-default" title="Detalhes" href="{{ route('logs.backup.show', $log->id) }}">
                    <i class="fa fa-exclamation-circle"></i>
                </a>
            </td>       
        </tr>
        @endforeach        
      </tbody>
    </table>
  </div>
  {{-- /listar usuarios --}}             
  {{$logs->links() }}
@endif
@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
    
@endsection