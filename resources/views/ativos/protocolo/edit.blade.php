@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Detalhe da Operação')


{{--  Page title  --}}

@section('page_title', 'Detalhe da Operação')

@section('page_title_html', '')

{{--  Page Content  --}}
@section('content')
    
    
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Detalhe da Operação <small></small></h2>        
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
        {!! Form::open(['route'=>['ativos.protocolos.update',$protocolo->id], 'method'=>'put', 'class'=> 'form-horizontal form-label-left']) !!}
          <div class="col-md-6">             
              <label>Titulo</label>
              <input class="form-control" value="{{$protocolo->titulo->nome()}}" disabled>
          </div>
          <div class="col-md-6">             
              <label>Representante</label>
              <input class="form-control" value="{{$protocolo->representante->nome_representante}}" disabled>
          </div>          
          <div class="row"><br></div><div class="clearfix"><br></div>
          <div class="col-md-4">
              <label>Realização</label>
              <input class="form-control" value="{{$protocolo->realizacao->format('d/m/Y')}}" disabled>
          </div>
          <div class="col-md-4">
              <label>Liquidação</label>
              <input data-inputmask="'mask': '99/99/9999'" type="text" name='liquidacao' class="form-control form-date" value="{{$protocolo->data_liquidacao()}}">
          </div>       
          <div class="col-md-4">
              <label>Situação</label>
              <input class="form-control" value="{{$protocolo->situacao->nome_situacao}}" disabled>
          </div>
             
          <div class="row"><br></div><div class="clearfix"><br></div>
          <div class="col-md-4">
              <label>Quantidade</label>
              <input class="form-control" value="{{$protocolo->quantidade}}" disabled>
          </div>
          <div class="col-md-4">
              <label>Valor Unitário</label>
              <input class="form-control money_mask" value="{{$protocolo->valor_unitario}}" disabled>
          </div>
          <div class="col-md-4">
              <label>Valor Comprado</label>
              <input class="form-control money_mask" value="R$ {{$protocolo->valor_total}}" disabled>
          </div>
          <div class="row"><br></div><div class="clearfix"><br></div>
          <div class="col-md-4">
              <label>Taxa de Juros Compactuada</label>
              <input class="form-control" value="{{$protocolo->taxa_juros}}" disabled>
          </div>
          <div class="col-md-4">
              <label>Taxa B3</label>
              <input class="form-control money_mask" value="{{$protocolo->taxa_b3}}" disabled>
          </div>
          <div class="col-md-4">
              <label>Taxa de Custodia</label>
              <input class="form-control money_mask" value="R$ {{$protocolo->taxa_custodia}}" disabled>
          </div>
          <div class="row"><br></div><div class="clearfix"><br></div>
          <div class="col-md-4">             
          </div>
          <div class="col-md-4">
              <label>Data Importação</label>
              <input class="form-control " value="{{$protocolo->created_at->format('d/m/Y')}}" disabled>
          </div>
          <div class="col-md-4">
              <label>Data Atualização</label>
              <input class="form-control " value="{{$protocolo->updated_at->format('d/m/Y')}}" disabled>
          </div>
          <div class="row">
              <div class="col-md-12">
                  <div class="form-group">
                        <div class="col-md-9">            
                            <button type="submit" class="btn btn-success">Salvar</button>
                        </div>
                    </div>
              </div>
          </div> 
                             
        {!! Form::close() !!}       
        </div>
        
      </div>
      
    </div>


@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
    
@endsection