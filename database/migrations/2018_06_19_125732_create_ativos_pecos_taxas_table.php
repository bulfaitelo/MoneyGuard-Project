<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAtivosPecosTaxasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ativos_precos_taxas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('titulo_id');
            $table->decimal('taxa_rendimento', 5, 2)->nullable();
            $table->decimal('valor_minimo', 9, 2)->nullable();
            $table->decimal('preco_unitario', 9, 2)->nullable();
            $table->timestamps();
        });

        Schema::table('ativos_precos_taxas', function($table) {
            $table->foreign('titulo_id', 'fk_ativos_precos_taxas_titulos')
            ->references('id')->on('titulos');            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ativos_precos_taxas', function (Blueprint $table) {
            $table->dropForeign('fk_ativos_precos_taxas_titulos');  
        });
        Schema::dropIfExists('ativos_precos_taxas');
    }
}
