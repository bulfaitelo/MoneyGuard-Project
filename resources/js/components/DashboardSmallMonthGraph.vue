<template>
    <div v-if="loaded" class="row">
        <div  v-for="(item, i) in corretoras" v-bind:key="i" class="col-sm-6 col-md-3">
            <div class="card">
              <div class="card-header border-0 pb-1">
                  <div class="d-flex justify-content-between">
                  <h3 class="card-title"><b>{{ item.corretora }}</b></h3>
                  <a v-bind:href="item.url"><strong><i alt="Detalhes" class=" text-muted fas fa-info-circle"></i></strong></a>
                  </div>
              </div>
              <div class="card-body pt-2">
                  <div class="d-flex">
                  <p class="d-flex flex-column">
                      <span v-bind:id="i" class="text-bold text-lg">R$ {{ item.valor }}</span>                    
                  </p>
                  <p class="ml-auto d-flex flex-column text-right">
                      <rendmento-arrow v-bind:rendimento='item.rendimento' ></rendmento-arrow>                                        
                  </p>
                  </div>
                  <!-- /.d-flex -->
                  <div class="position-relative ">                
                  <line-chart style="height: 200px"       
                    :chartdata="item.chartdata"
                    :options="options"/>
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>

import LineChart from './ChartDash.vue';

// Arrow
Vue.component('rendmento-arrow', {
    props: ['rendimento'],
    template:   '<span v-bind:class="checkRendimentoMes.color">'+
                    '<i v-bind:class="checkRendimentoMes.arrow"></i> {{ rendimento }}%'+
                '</span>',
    computed: {
        checkRendimentoMes: function (){
            var r = Array;
            if(this.rendimento >= 0){
                r['arrow'] = 'fas fa-arrow-up';
                r['color'] = 'text-success';
                
            }else{
                r['arrow'] = 'fas fa-arrow-down';  
                r['color'] = 'text-danger';
            }
            return r;
        }
    }
});

export default {
  name: 'LineChartContainer',
  components: { LineChart },
  data: () => ({    
    loaded: false,    
    corretoras: null,
    options: {
      onHover: minhaFuncao,
      legend: {
          display: false,                           
      },
      responsive: true,
      title: {
          display: false,                            
      },
      tooltips: {
          // mode: 'index',
          // intersect: false,
      },
      hover: {
          mode: 'nearest',
          intersect: true
      },
      maintainAspectRatio: false,
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
              radius: 0,
              hoverRadius: 4
          }
      },
      events: ['mousemove']                        
  }
  }),
  async mounted () {
    this.loaded = false
    try {
     var {data} = await axios
      .get('./api/home_dash_grafico_evo')      
      // console.log(data);
      this.corretoras = data;
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
                    

function  minhaFuncao(evt) {
  var activePoints = this.getElementsAtEventForMode(evt, 'nearest', this.options);  
  var firstPoint = activePoints[0];   
  var value = this.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];    
  // $('#'+this.id).html(value);
  $('#'+this.id).html(formatReal(value));
}


function formatReal( int ){
  return  int.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});  
}
</script>
