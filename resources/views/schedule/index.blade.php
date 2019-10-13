@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Home')


{{--  Page title  --}}
@section('page_title', 'HOME')

@section('page_title_html', '')
{{-- @section('page_search_html', '') --}}

{{--  Page Content  --}}
@section('content')

<div class="row">
    <div class="col-md-6">
        {!! Form::open(['route'=>'schedule.index', 'method'=>'post']) !!}                
            <button type="submit"  value='tesouro_extrato' name='sync' class="btn btn-success">Importar Manualmente</button>  
        {!! Form::close() !!} 
        <div class="form-group">
            <pre>{{@$tesouro_extrato_log}}</pre>        
        </div>
    </div>
    <div class="col-md-6">
        <div class="table-responsive">
            <div class="col-md-9">
                <h2>TESOURO DIRETO</h2>
            </div>
            <div class="clearfix"></div>          
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="column-title">Usuário </th>            
                        <th class="column-title">Data importação</th>
                        <th class="column-title"></th>          
                        <th class="column-title"></th>            
                    </tr>
                </thead>
                <tbody>
                @forelse($tesouro_extratos as $tesouro_extrato)
                    <tr class="even pointer">          
                        <td class=" ">{{$tesouro_extrato->user->name}}</td>            
                        <td class=" ">{{$tesouro_extrato->created_at->format('d/m/Y H:i:s')}}</td>            
                        <td><span class="label label-danger pull-right">{{$tesouro_extrato->tipo_erro}}</span></td>
                        <td>
                            <a class="btn btn-default btn-xs" title="Detalhes" href="{{ route('logs.import.show', $tesouro_extrato->id) }}">
                                <i class="fa fa-exclamation-circle"></i>
                            </a>
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
    </div>
    <div class="clearfix"></div>
    <hr>
</div>
<div class="row">
    <div class="col-md-6">    
        <button type="button" class="btn btn-success">Importar Manualmente</button>  
        <div class="form-group">
            <pre></pre>        
        </div>
    </div>
    <div class="col-md-6">
        <div class="table-responsive">
            <div class="col-md-9">
                <h2>Aniverários Santander</h2>
            </div>
            <div class="clearfix"></div>          
            <table class="table table-hover">
                <thead>
                <tr>
                    <th class="column-title">Usuário </th>            
                    <th class="column-title">Data importação</th>
                    <th class="column-title"></th>          
                    <th class="column-title"></th>            
                </tr>
                </thead>
                <tbody>
                @forelse($tesouro_extratos as $tesouro_extrato)
                <tr class="even pointer">          
                    <td class=" ">{{$tesouro_extrato->user->name}}</td>            
                    <td class=" ">{{$tesouro_extrato->created_at->format('d/m/Y H:i:s')}}</td>            
                    <td><span class="label label-danger pull-right">{{$tesouro_extrato->tipo_erro}}</span></td>
                    <td>
                        <a class="btn btn-default btn-xs" title="Detalhes" href="{{ route('logs.import.show', $tesouro_extrato->id) }}">
                            <i class="fa fa-exclamation-circle"></i>
                        </a>
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
    </div>
    <div class="clearfix"></div>
    <hr>
</div>




@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
    
@endsection