<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAtivosProtocolosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ativos_protocolos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('protocolo');
            $table->unsignedBigInteger('operacao_id');
            $table->unsignedBigInteger('situacao_id');
            $table->date('realizacao')->nuable();
            $table->date('liquidacao')->nuable()->nullable();
            $table->unsignedBigInteger('representante_id');
            $table->unsignedBigInteger('titulo_id');
            $table->decimal('quantidade', 5, 2)->nullable();
            $table->decimal('valor_unitario', 10, 2);
            $table->decimal('taxa_juros', 10, 2)->nullable();
            $table->decimal('taxa_b3', 10, 2)->nullable();
            $table->decimal('taxa_custodia', 10, 2)->nullable();
            $table->decimal('valor_total', 10, 2);
            $table->timestamps();
        });

        Schema::table('ativos_protocolos', function($table) {
            $table->foreign('user_id', 'fk_ativos_protocolos_users')
            ->references('id')->on('users');
        });

        Schema::table('ativos_protocolos', function($table) {
            $table->foreign('representante_id', 'fk_ativos_protocolos_representantes')
            ->references('id')->on('representantes');
        });

        Schema::table('ativos_protocolos', function($table) {
            $table->foreign('titulo_id', 'fk_ativos_protocolos_titulos')
            ->references('id')->on('titulos');            
        });

        Schema::table('ativos_protocolos', function($table) {
            $table->foreign('operacao_id', 'fk_ativos_protocolos_ativos_operacao')
            ->references('id')->on('ativos_operacao');            
        });

        Schema::table('ativos_protocolos', function($table) {
            $table->foreign('situacao_id', 'fk_ativos_protocolos_ativos_situacao')
            ->references('id')->on('ativos_situacao');            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ativos_protocolos', function (Blueprint $table) {
            $table->dropForeign('fk_ativos_protocolos_users');
            $table->dropForeign('fk_ativos_protocolos_representantes');
            $table->dropForeign('fk_ativos_protocolos_titulos');      
            $table->dropForeign('fk_ativos_protocolos_ativos_operacao');     
            $table->dropForeign('fk_ativos_protocolos_ativos_situacao');  
        });
        Schema::dropIfExists('ativos_protocolos');
    }
}
