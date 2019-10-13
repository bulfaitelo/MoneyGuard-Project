@extends('admin-lte.layouts.app')

@section('htmlheader_title', $titulo->nome())


{{--  Page title  --}}
{{-- @section('page_title', $titulo->nome_titulo) --}}

@section('page_title_html', '')
@section('page_search_html', '')

{{--  Page Content  --}}
@section('content')
<div class="page-title">
    <div class="title_left">
      <h3>{{$titulo->nome()}}</h3>
    </div>  
</div>
<div class="row">  
    @foreach ($ativos as $ativo)
      <div class="col-md-6">
          <div class="x_panel">        
            <div class="x_content">
                <div class="" style="">
                  <canvas id="id{{ $ativo->representante_id }}"></canvas>
                </div>
                <div class="row">                
                  <hr>
                  <blockquote>
                    <div class="row">
                      <div class="col-md-6"><b>Valor Bruto:</b></div>
                      <div class="col-md-6 money_mask">{{$ativo->valor_bruto_atual}}</div>     
                    </div>
                    <div class="row">
                      <div class="col-md-6"><b>Rendimento:</b></div>
                      <div class="col-md-6 money_mask">{{number_format($ativo->valor_bruto_atual - $ativo->valor_investido, 2, '.', '')}}</div>     
                    </div>
                    <div class="row">
                      <div class="col-md-6"><b>Valor Liquido:</b></div>
                      <div class="col-md-6 money_mask">{{$ativo->valor_liquido_atual}}</div>     
                    </div>
                    <div class="row">
                      <div class="col-md-6"><b>Valor investido:</b></div>
                      <div class="col-md-6 money_mask">{{$ativo->valor_investido}}</div>     
                    </div>
                    <div class="row">
                      <div class="col-md-6"><b>Quantidade Ativos:</b></div>
                      <div class="col-md-6 money_mask">{{$ativo->quant_total}}</div>     
                    </div>
                  </blockquote>                
                </div>                  
            </div>
          </div>          
      </div>
    @endforeach    
</div>
@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
<script>



window.onload = function() {    
  @foreach ($ativos as $ativo)
    var ctx{{$ativo->representante_id}} = document.getElementById("id{{$ativo->representante_id}}").getContext('2d');
    window.myD{{$ativo->representante_id}} = new Chart(ctx{{$ativo->representante_id}}, {
      type: 'doughnut',
      data: {!! json_encode($json[$ativo->representante_id]) !!},
      options: {
        responsive: true,
        title: {
          display: true,
          text: '{{$ativo->representante->nome_representante}}'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
    });   
  @endforeach  
  };




</script>
@endsection