<template>
    <div class="row">
        <div v-for="item in array" v-bind:key="item.id" class="col-3">
            <div class="card">
            <div class="card-header border-0">
                <div class="d-flex justify-content-between">
                <h3 class="card-title">{{ item.nome }}</h3>
                <a v-bind:href="item.url">View Report</a>
                </div>
            </div>
            <div class="card-body">
                <div class="d-flex">
                <p class="d-flex flex-column">
                    <span class="text-bold text-lg">R$ {{ item.valor }}</span>
                    <span>Rendimentos</span>
                </p>
                <p class="ml-auto d-flex flex-column text-right">
                    <rendmento-arrow v-bind:rendimento='item.rendimento' ></rendmento-arrow>                    
                    <span class="text-muted">Rend. mês</span>
                </p>
                </div>
                <!-- /.d-flex -->
                <div class="position-relative ">
                <canvas v-bind:id="item.chart" height="180"></canvas>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        },
    });
    export default {       
        mounted() {
            console.log('dashboard')
        },
        data: function () {
            return {
                array: [
                    {
                        valor: '3.123,94',
                        nome: 'vérios',
                        rendimento: '-1.3',
                        url: '#',
                        chart: 'visitors-chart'
                    },
                    {
                        valor: '17.659,01',
                        nome: 'Easyvest',
                        rendimento: '12.5',
                        url: '#',
                        chart: 'xabla-chart'
                    }
                ]
            }
        }       
    }
</script>