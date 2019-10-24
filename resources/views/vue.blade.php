@extends('admin-lte.layouts.app')

@section('htmlheader_title', 'Home')


{{--  Page title  --}}
@section('page_title', 'HOME')

{{-- @section('page_title_html', '') --}}
{{-- @section('page_search_html', '') --}}

{{--  Page Content  --}}
@section('content')


{{-- <chart-vue></chart-vue> --}}

{{-- <DIV id="graph_coords"></DIV>
<DIV class="chart-container" style="position: relative; height:40vh; width:80vw;">
  <CANVAS id="graph_1" style="background-color: #CBCBCB;"></CANVAS>
</DIV> --}}
<span id="test">asd</span>
<canvas class="col-5" id="myChart" width="400" height="400"></canvas>







@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
<script>
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{            
            data: [77, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        onClick: minhaFuncao,
        legend: {
            display: false,                           
        },
        responsive: true,
        title: {
            display: false,                            
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
                gridLines: {
                    display:false
                }
            }],
            yAxes: [{
                gridLines: {
                    display:false
                }   
            }]
        },
        elements:{
            point:{
                radius: 0
            }
        },
    }
});

function  minhaFuncao(evt)
  {
    // var activePoints = myChart.getElementAtEvent(evt);
    // console.log(activePoints);


 
        var activePoints = myChart.getElementsAtEventForMode(evt, 'nearest', myChart.options);
        var firstPoint = activePoints[0];   
        var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        console.table(myChart);
    // };
    //  alert('Você clicou em ' + activePoints[0]._model.label);
    $('#test').html(value)
  }

// var chart = new Chart(ctx, {
//     type: 'line',
//     data: data: [12, 19, 3, 5, 2, 3],
//     options: {
//         
//     }
// });
</script>


{{-- <script>
$(document).ready(function() {
  var ctx = $("#graph_1");
  var dataArray =  [ {x:1,y:1},{x:2,y:3},{x:3,y:5},{x:4,y:8},{x:5,y:7},{x:6,y:4},{x:7,y:2},{x:8,y:1} ];
  
  var myChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: "test",
        fill: false,
        data: dataArray
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Test Graph'
      },
      animation: {
        duration: 0,
      }, // general animation time
      hover: {
        animationDuration: 0,
      }, // duration of animations when hovering an item
      responsiveAnimationDuration: 0, // animation duration after a resize
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'x axis label'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'y axis label'
          }
        }]
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          // Use the footer callback to display the sum of the items showing in the tooltip
          footer: function(tooltipItems, data) {
            return 'x:' + this._eventPosition.x + ' y:' + this._eventPosition.y;
          },
        },
        footerFontStyle: 'normal'
      },
    }

  });

  ctx.mousemove(function(evt) {
    //console.log(evt.offsetX + "," + evt.offsetY);
    var ytop = myChart.chartArea.top;
    var ybottom = myChart.chartArea.bottom;
    var ymin = myChart.scales['y-axis-1'].min;
    var ymax = myChart.scales['y-axis-1'].max;
    var newy = '';
    var showstuff = 0;
    if (evt.offsetY <= ybottom && evt.offsetY >= ytop) {
      newy = Math.abs((evt.offsetY - ytop) / (ybottom - ytop));
      newy = (newy - 1) * -1;
      newy = newy * (Math.abs(ymax - ymin)) + ymin;
      showstuff = 1;
    }
    var xtop = myChart.chartArea.left;
    var xbottom = myChart.chartArea.right;
    var xmin = myChart.scales['x-axis-1'].min;
    var xmax = myChart.scales['x-axis-1'].max;
    var newx = '';
    if (evt.offsetX <= xbottom && evt.offsetX >= xtop && showstuff == 1) {
      newx = Math.abs((evt.offsetX - xtop) / (xbottom - xtop));
      newx = newx * (Math.abs(xmax - xmin)) + xmin;
    }
    if (newy != '' && newx != '') {
      console.log(newx + ',' + newy);
      $("#graph_coords").html('Mouse Coordinates: ' + newx.toFixed(2) + ',' + newy.toFixed(2));
    }
  });
});
</script> --}}
@endsection