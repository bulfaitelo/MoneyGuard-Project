<template>
    <div class="row">
        <div v-for="(item, i) in corretoras" v-bind:key="i" class="col-sm-6 col-md-3">
            <div class="card">
            <div class="card-header border-0 pb-1">
                <div class="d-flex justify-content-between">
                <h3 class="card-title"><b>{{ item.nome }}</b></h3>
                <a v-bind:href="item.url"><strong><i alt="Detalhes" class=" text-muted fas fa-info-circle"></i></strong></a>
                </div>
            </div>
            <div class="card-body pt-2">
                <div class="d-flex">
                <p class="d-flex flex-column">
                    <span id="" class="text-bold text-lg">R$ {{ item.valor }}</span>                    
                </p>
                <p class="ml-auto d-flex flex-column text-right">
                    <rendmento-arrow v-bind:rendimento='item.rendimento' ></rendmento-arrow>                                        
                </p>
                </div>
                <!-- /.d-flex -->
                <div class="position-relative ">                
                <vue-canvas></vue-canvas>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>


<script>

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

    // CANVAS to chart    
    Vue.component('vue-canvas', {
        template: ' <canvas id="myChart" height="180"></canvas>',
        
        methods: {
            draw: function (ctx) {
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['1', '2', '3', '5', '6', '7'],
                        datasets: [{                            
                            data: ['300.00', '190.00', '300.00', '500.00', '200.00', '300.00'],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)'                                
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)'                               
                            ],
                            borderWidth: 2
                        }]
                    },
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
                        events: ['mousemove']                        
                    }
                })
            }
        },
        mounted: function() {
            var c = document.getElementById("myChart");
            var ctx = c.getContext("2d");
            // ctx.translate(0.5, 0.5);
            // ctx.imageSmoothingEnabled = false;
            this.draw(ctx);
        },
        
        
    });
    // default
    export default {       
        mounted() {
            console.log('dashboard')
        },
        data: function () {
            return {
                corretoras: [
                    {
                        valor: '3.123,94',
                        nome: 'corretora',
                        rendimento: '-1.3',
                        url: '#',
                        chart: 'myChart'
                    }
                ]
            }
        }       
    }

    function  minhaFuncao(evt) {

        var activePoints = myChart.getElementsAtEventForMode(evt, 'nearest', myChart.options);
        // var firstPoint = activePoints[0];   
        // var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        console.log(activePoints);
    }


</script>

