@extends('admin-lte.layouts.app')

@section('htmlheader_title', $titulo->nome_titulo)


{{--  Page title  --}}
{{-- @section('page_title', $titulo->nome_titulo) --}}

@section('page_title_html', '')
@section('page_search_html', '')

{{--  Page Content  --}}
@section('content')

<div class="row">
    <div class="col-md-12">
        <div class="x_panel">
        <div class="row x_title">
            <div class="col-md-6">
                <h3> {{$titulo->nome_titulo}} </h3>
            </div>
            <div class="col-md-6">
            <div id="home_range_liquido" class="pull-right" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc">
                <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>           
                <span></span> <b class="caret"></b>
            </div>
            </div>
        </div>
        <div class="x_content">
            <div class="demo-container" style="">
            <canvas id="rendimentoLiquido"></canvas>
            </div>
        </div>
        </div>
    </div>
</div>
@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
<script>


var values_chart_liquido = null;

init_daterangepicker_rendimento_liquido();

var config_liquido = {
  type: 'line',
  data: values_chart_liquido,
  options: {
    responsive: true,
    title: {
      display: false,
      text: 'Chart.js Line Chart'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Período'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Valor'
        }
      }]
    }
  }
};

function init_daterangepicker_rendimento_liquido() {

    // if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
    // console.log('init_daterangepicker');
  
    var cb = function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
      $('#home_range_liquido span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    };
  
    var optionSet1 = {
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),       
      showDropdowns: false,
      showWeekNumbers: false,
      timePicker: false,
      timePickerIncrement: 1,
      timePicker12Hour: false,      
      ranges: {
      'Hoje': [moment(), moment()],
      'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Últimos 7 dias': [moment().subtract(6, 'days'), moment()],
      'Últimos 30 dias': [moment().subtract(29, 'days'), moment()],
      'Este Mês': [moment().startOf('month'), moment().endOf('month')],
      'Último Mês': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      alwaysShowCalendars : true,
      opens: 'left',
      buttonClasses: ['btn btn-default'],
      applyClass: 'btn-small btn-primary',
      cancelClass: 'btn-small',
      format: 'DD/MM/YYYY',
      separator: ' to ',
      locale: {
        format: 'DD/MM/YYYY',
        applyLabel: 'Enviar',
        cancelLabel: 'Cancelar',
        fromLabel: 'From',
        toLabel: 'To',
        customRangeLabel: 'Customizado',
        daysOfWeek: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']     
      }
    };
  
    $('#home_range_liquido span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
    $('#home_range_liquido').daterangepicker(optionSet1, cb);
    $('#home_range_liquido').on('show.daterangepicker', function() {
      console.log("show event fired");
    });
    $('#home_range_liquido').on('hide.daterangepicker', function() {
      console.log("hide event fired");
    });
    $('#home_range_liquido').on('apply.daterangepicker', function(ev, picker) {
      console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
      $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
      });
      $.ajax({
        url:'/api/ativo_preco',
        type: "POST",
        dataType:'json',
        cache: false,
        data:{
          titulo_id: {{$titulo->id}},
          start_date:picker.startDate.format('YYYY-MM-DD'),
          end_date:picker.endDate.format('YYYY-MM-DD'),
          hidden_response:get_hidden(config_liquido.data.datasets, myLineLiquido)
          
        },
          
        beforeSend: function() {
            //Ação antes de fazer o post dos dados.
        },
        success:function(json) {
            console.log(json.labels);
                config_liquido.data = json;
                window.myLineLiquido.update();
                
        },
        error:function(jqXHR, textStatus, errorThrown) {
            alert('Ocorreu um erro. Informe ao ADM do sistema.');
            console.log("error: " + textStatus);
            console.log("error Thrown: " + errorThrown);
            console.log("incoming Text: " + jqXHR.responseText);
        }
      });
      // console.log(picker.startDate.format('YYYY-MM-DD'));
      // console.log(picker.endDate.format('YYYY-MM-DD'));
    });
    $('#home_range_liquido').on('cancel.daterangepicker', function(ev, picker) {
      console.log("cancel event fired");
    });
    $('#options1').click(function() {
      $('#home_range_liquido').data('daterangepicker').setOptions(optionSet1, cb);
    });
    $('#options2').click(function() {
      $('#home_range_liquido').data('daterangepicker').setOptions(optionSet2, cb);
    });
    $('#destroy').click(function() {
      $('#home_range_liquido').data('daterangepicker').remove();
    });
  
  }


  window.onload = function() {
    $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
      });
      $.ajax({
        url:'/api/ativo_preco',
        type: "POST",
        dataType:'json',
        cache: false,
        data:{
          titulo_id: {{$titulo->id}},
          start_date:moment().subtract(29, 'days').format('YYYY-MM-DD'),
          end_date:moment().format('YYYY-MM-DD'),},
          
        beforeSend: function() {
            //Ação antes de fazer o post dos dados.
        },
        success:function(json) {
            // console.log(json.labels);
                config_liquido.data = json;
                window.myLineLiquido.update();
                
        },
        error:function(jqXHR, textStatus, errorThrown) {
            alert('Ocorreu um erro. Informe ao ADM do sistema.');
            console.log("error: " + textStatus);
            console.log("error Thrown: " + errorThrown);
            console.log("incoming Text: " + jqXHR.responseText);
        }
      });
    var ctxLiquido = document.getElementById("rendimentoLiquido").getContext('2d');
    window.myLineLiquido = new Chart(ctxLiquido, config_liquido);   
  };

// função para pegar as linkas que estão ocultas. 
function get_hidden(object_var, chart){
  var response_hidden = {};
  for(var i=0; i< object_var.length; i++) {
      // console.log(object_var[i].label);
        meta = chart.getDatasetMeta(i);
      if(typeof object_var[i].hidden != "undefined"){
        if(meta.hidden != false){
          response_hidden[object_var[i].label] = object_var[i].hidden;
        }
      } else {
        response_hidden[object_var[i].label] = meta.hidden;
      }
      // console.log(meta.hidden);
  }
  return JSON.stringify(response_hidden);
}



</script>
@endsection