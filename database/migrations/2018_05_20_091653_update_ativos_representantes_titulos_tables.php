<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateAtivosRepresentantesTitulosTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ativos_extratos', function($table) {
            $table->foreign('user_id', 'fk_ativos_extrato_users')
            ->references('id')->on('users');
        });

        Schema::table('ativos_extratos', function($table) {
            $table->foreign('representante_id', 'fk_ativos_extrato_representantes')
            ->references('id')->on('representantes');
        });

        Schema::table('ativos_extratos', function($table) {
            $table->foreign('titulo_id', 'fk_ativos_extrato_titulos')
            ->references('id')->on('titulos');            
        });

        Schema::table('ativos_extratos', function($table) {
            $table->foreign('data_import_id', 'fk_ativos_extrato_data_imports')
            ->references('id')->on('data_imports');            
        });      

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ativos_extratos', function (Blueprint $table) {
            $table->dropForeign('fk_ativos_extrato_users');
            $table->dropForeign('fk_ativos_extrato_representantes');
            $table->dropForeign('fk_ativos_extrato_titulos');
            $table->dropForeign('fk_ativos_extrato_data_imports');
        });
    }
}
