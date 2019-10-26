<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAtivosExtratosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ativos_extratos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('representante_id');
            $table->unsignedBigInteger('titulo_id');
            $table->unsignedBigInteger('data_import_id');
            $table->decimal('valor_investido', 10, 2);
            $table->decimal('valor_bruto_atual', 10, 2);
            $table->decimal('valor_liquido_atual', 10 ,2);
            $table->decimal('quant_total', 10, 2);
            $table->decimal('quant_bloqueado', 10 ,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ativos_extratos');
    }
}
