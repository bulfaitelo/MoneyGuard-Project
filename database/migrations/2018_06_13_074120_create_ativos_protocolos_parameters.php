<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAtivosProtocolosParameters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('ativos_operacao', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nome_operacao', 200);
            $table->timestamps();
        });

        Schema::create('ativos_situacao', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nome_situacao', 200);            
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
        //
        Schema::dropIfExists('ativos_operacao');
        Schema::dropIfExists('ativos_situacao');
        
    }
}
