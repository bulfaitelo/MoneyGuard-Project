@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Home')


{{--  Page title  --}}
@section('page_title_html', '')
@section('page_title', 'HOME')

{{--  Page Content  --}}
@section('content')
{{--  HEADER BAR  --}}
<div class="row top_tiles" style="margin: 10px 0;">
  <div class="col-md-3 col-sm-3 col-xs-6 tile">
    <span><b>EASYNVEST</b></span>
    <h2>{{ $home_graphic['EASYNVEST_day'] }}</h2>
    <span class="header_bars" style="height: 160px;">{{ $home_graphic['EASYNVEST'] }}</span>
  </div>
  <div class="col-md-3 col-sm-3 col-xs-6 tile">
    <span><b>Verios</b></span>
    <h2>{{ $home_graphic['RICO INVESTIMENTOS_day'] }}</h2>
    <span class="header_bars" style="height: 160px;">{{ $home_graphic['RICO INVESTIMENTOS'] }}</span>
  </div>
  <div class="col-md-3 col-sm-3 col-xs-6 tile">
    <span><b>Santander</b></span>
    <h2>{{ $home_graphic['SANTANDER_day'] }}</h2>
    <span class="header_bars" style="height: 160px;">{{ $home_graphic['SANTANDER'] }}</span>
  </div>
  <div class="col-md-3 col-sm-3 col-xs-6 tile">
    <span><b>Total</b></span>
    <h2>{{ $home_graphic['TOTAL_day'] }}</h2>
    <span class="header_bars" style="height: 160px;">{{ $home_graphic['TOTAL'] }}</span>
  </div>
</div>
{{--  /HEADER BAR  --}}
<br>
{{--  MAIN GRAPHIC - Liquido  --}}
<div class="row">
  <div class="col-md-10">
    <div class="x_panel">
      <div class="row x_title">
        <div class="col-md-4">
          <h3> Rendimento Líquido <small> Agrupatos por titulo </small></h3>
        </div>
        <div class="col-md-2">            
          <div class="">
            <label for="check_movi_liquido">
              <input name="check_movi_liquido" id="check_movi_liquido" value="true" type="checkbox" checked class="js-switch"/> Considerar Movimentações            
            </label>
          </div>      
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Agrupados</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <select id='group_liquido' name="group_liquido" class="form-control">
                <option value='day' >Dia</option>
                <option value='week'>Semana</option>
                <option value='month'>Mês</option>                
              </select>
            </div>
          </div>
        </div>

        <div class="col-md-4">
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
  <div class="col-sm-2 col-xs-12">
    @foreach  ($rendimento_mensal as $mes => $dados)
      <div class="row tile_count">
        <div class="col-md-12 col-sm-12 tile_stats_count">
          <span class="count_top"><i class="fa fa-bar-chart"> </i><b> {{$mes}} </b></span>
        <div class="count">{{$dados['valor']}}</div>
        @if(isset($dados['diferenca_mes']))
          <span class="count_bottom"><i class="green">+{{$dados['diferenca_mes']}} </i> ao mês anterior</span>
        @endif
        </div>        
      </div>      
    @endforeach
  </div>
</div>
{{--  /MAIN GRAPHIC - Liquido  --}}
<br>
{{--  MAIN GRAPHIC - Bruto  --}}
<div class="row">
  <div class="col-md-10">
    <div class="x_panel">
      <div class="row x_title">
        <div class="col-md-4">
          <h3> Rendimento Bruto <small> Agrupatos por titulo </small></h3>
        </div>
        <div class="col-md-2">            
            <div class="">
              <label for="check_movi_bruto">
                <input name="check_movi_bruto" id="check_movi_bruto" type="checkbox" value="true" class="js-switch"/> Considerar Movimentações                
              </label>
            </div>         
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label class="control-label col-md-3 col-sm-3 col-xs-12">Agrupados</label>
              <div class="col-md-9 col-sm-9 col-xs-12">
                <select id='group_bruto' name="group_bruto" class="form-control">
                  <option value='day' >Dia</option>
                  <option value='week'>Semana</option>
                  <option value='month'>Mês</option>                
                </select>
              </div>
            </div>
          </div>
        <div class="col-md-4">
          <div id="home_range_bruto" class="pull-right" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc">
            <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>           
            <span></span> <b class="caret"></b>
          </div>
        </div>
      </div>
      <div class="x_content">
        <div class="demo-container" style="">
          <canvas id="rendimentoBruto"></canvas>
        </div>
      </div>  
    </div>
  </div>
</div>
{{--  /MAIN GRAPHIC - Bruto  --}}
@endsection

{{--  Optional script Blades  --}}
@section('script_blade')

<script>
$(".header_bars").sparkline('html', {
  type: 'bar',
  height: '125',
  barWidth: 13,
  colorMap: {
    '7': '#a1a1a1'
  },
  barSpacing: 3,
  barColor: '#26B99A',
});

var values_chart_bruto = null;
var values_chart_liquido = null;
</script> 
{{--  Date Range Picker  --}}
<script>
  var json;
  init_daterangepicker_rendimento_bruto();
  init_daterangepicker_rendimento_liquido();
  function init_daterangepicker_rendimento_bruto() {

    // if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
    // console.log('init_daterangepicker');

    var cb = function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
      $('#home_range_bruto span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
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

    $('#home_range_bruto span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
    $('#home_range_bruto').daterangepicker(optionSet1, cb);
    $('#home_range_bruto').on('show.daterangepicker', function() {
      console.log("show event fired");
    });
    $('#home_range_bruto').on('hide.daterangepicker', function() {
      console.log("hide event fired");
    });
    $('#home_range_bruto').on('apply.daterangepicker', function(ev, picker) {
      console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
      $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
      });
      $.ajax({
        url:'/api/home_rendimento_bruto',
        type: "POST",
        dataType:'json',
        cache: false,
        data:{
          start_date:picker.startDate.format('YYYY-MM-DD'),
          end_date:picker.endDate.format('YYYY-MM-DD'),
          hidden_response:get_hidden(config_bruto.data.datasets, myLineBruto),
          check_movimento:$(("input[name='check_movi_bruto']")).is(":checked"),
          group_bruto:$("#group_bruto").val()
        },
          
        beforeSend: function() {
            //Ação antes de fazer o post dos dados.
        },
        success:function(json) {
            // console.log(json.labels);
                config_bruto.data = json;                 
                if(json.labels.length > 1){
                  config_bruto.type = 'line';
                } else {
                  config_bruto.type = 'bar';
                }
                window.myLineBruto.update();
                
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
    $('#home_range_bruto').on('cancel.daterangepicker', function(ev, picker) {
      console.log("cancel event fired");
    });
    $('#options1').click(function() {
      $('#home_range_bruto').data('daterangepicker').setOptions(optionSet1, cb);
    });
    $('#options2').click(function() {
      $('#home_range_bruto').data('daterangepicker').setOptions(optionSet2, cb);
    });
    $('#destroy').click(function() {
      $('#home_range_bruto').data('daterangepicker').remove();
    });

  }

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
      url:'/api/home_rendimento_liquido',
      type: "POST",
      dataType:'json',
      cache: false,
      data:{
        start_date:picker.startDate.format('YYYY-MM-DD'),
        end_date:picker.endDate.format('YYYY-MM-DD'),
        hidden_response:get_hidden(config_liquido.data.datasets, myLineLiquido),
        check_movimento:$(("input[name='check_movi_liquido']")).is(":checked"),
        group_liquido:$("#group_liquido").val()
      },
        
      beforeSend: function() {
          //Ação antes de fazer o post dos dados.
      },
      success:function(json) {          
              config_liquido.data = json;
              if(json.labels.length > 1){
                config_liquido.type = 'line';
              } else {
                config_liquido.type = 'bar';
              }
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

$(("input[name='check_movi_liquido']")).click(function (){
  change_liqudo();
});


$("#group_liquido").on('change', function () {
  change_liqudo();
});
  


function change_liqudo() {      
  $.ajax({
    url:'/api/home_rendimento_liquido',
    type: "POST",
    dataType:'json',
    cache: false,
    data:{
      start_date:$('#home_range_liquido').data('daterangepicker').startDate.format('YYYY-MM-DD'),
      end_date:$('#home_range_liquido').data('daterangepicker').endDate.format('YYYY-MM-DD'),      
      hidden_response:get_hidden(config_liquido.data.datasets, myLineLiquido),
      check_movimento:$(("input[name='check_movi_liquido']")).is(":checked"),
      group_liquido:$("#group_liquido").val()

    },
      
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
}


$(("input[name='check_movi_bruto']")).click(function (){
  change_bruto();
});


$("#group_bruto").on('change', function () {
  change_bruto();
});

function change_bruto (){
  $.ajax({
      url:'/api/home_rendimento_bruto',
      type: "POST",
      dataType:'json',
      cache: false,
      data:{
        start_date:$('#home_range_bruto').data('daterangepicker').startDate.format('YYYY-MM-DD'),
        end_date:$('#home_range_bruto').data('daterangepicker').endDate.format('YYYY-MM-DD'),  
        hidden_response:get_hidden(config_bruto.data.datasets, myLineBruto),
        check_movimento:$(("input[name='check_movi_bruto']")).is(":checked"),
        group_bruto:$("#group_bruto").val()        
      },
        
      beforeSend: function() {
          //Ação antes de fazer o post dos dados.
      },
      success:function(json) {
          // console.log(json.labels);              
              window.myLineBruto.update();
              
      },
      error:function(jqXHR, textStatus, errorThrown) {
          alert('Ocorreu um erro. Informe ao ADM do sistema.');
          console.log("error: " + textStatus);
          console.log("error Thrown: " + errorThrown);
          console.log("incoming Text: " + jqXHR.responseText);
      }
    });
}
</script>

{{--  Charts.js  --}}
<script> 


var config_bruto = {
  type: 'line',
  data: values_chart_bruto,
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

window.onload = function() {

  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });
// BRUTO
  $.ajax({
    url:'/api/home_rendimento_bruto',
    type: "POST",
    dataType:'json',
    cache: false,
    data:{
      start_date:moment().subtract(29, 'days').format('YYYY-MM-DD'),
      end_date:moment().format('YYYY-MM-DD'), 
      group_bruto:$("#group_bruto").val()

    },
      
    beforeSend: function() {
        //Ação antes de fazer o post dos dados.
    },
    success:function(json) {
        // console.log(json.labels);
            config_bruto.data = json;
            window.myLineBruto.update();
            
    },
    error:function(jqXHR, textStatus, errorThrown) {
        alert('Ocorreu um erro. Informe ao ADM do sistema.');
        console.log("error: " + textStatus);
        console.log("error Thrown: " + errorThrown);
        console.log("incoming Text: " + jqXHR.responseText);
    }
  });
// -- BRUTO

// LIQUIDO

$.ajax({
  url:'/api/home_rendimento_liquido',
  type: "POST",
  dataType:'json',
  cache: false,
  data:{
    start_date:moment().subtract(29, 'days').format('YYYY-MM-DD'),
      end_date:moment().format('YYYY-MM-DD'),
      check_movimento:$(("input[name='check_movi_liquido']")).is(":checked"),
      group_liquido:$("#group_liquido").val()

  },
    
  beforeSend: function() {
      //Ação antes de fazer o post dos dados.
  },
  success:function(json) {      
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


// -- LIQUIDO






  var ctxBruto = document.getElementById("rendimentoBruto").getContext('2d');
  window.myLineBruto = new Chart(ctxBruto, config_bruto);       
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