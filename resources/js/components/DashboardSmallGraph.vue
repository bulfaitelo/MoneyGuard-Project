<template>
    <div class="row">
        <div class="col-3">
            <div class="card">
            <div class="card-header border-0">
                <div class="d-flex justify-content-between">
                <h3 class="card-title">VÈRIOS</h3>
                <a href="javascript:void(0);">View Report</a>
                </div>
            </div>
            <div class="card-body">
                <div class="d-flex">
                <p class="d-flex flex-column">
                    <span class="text-bold text-lg">R$ 4.852,00</span>
                    <span>Rendimentos</span>
                </p>
                <p class="ml-auto d-flex flex-column text-right">
                    <span class="text-success">
                    <i class="fas fa-arrow-up"></i>12.5%
                    </span>
                    <span class="text-muted">Rendimentos no mês</span>
                </p>
                </div>
                <!-- /.d-flex -->

                <div class="position-relative mb-4">
                <canvas id="visitors-chart" height="200"></canvas>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('dashboard')
        }
    }
</script>