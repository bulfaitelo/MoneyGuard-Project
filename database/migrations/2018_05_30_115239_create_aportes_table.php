<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAportesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aportes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('titulo_id');
            $table->unsignedBigInteger('representante_id');
            $table->decimal('valor', 10, 2);
            $table->date('data_aporte');
            $table->date('data_efetivacao');
            $table->string('obs', 300);
            $table->timestamps();
        });

        Schema::table('aportes', function($table) {
            $table->foreign('user_id', 'fk_aporte_users')
            ->references('id')->on('users');
        });

        Schema::table('aportes', function($table) {
            $table->foreign('representante_id', 'fk_aporte_representantes')
            ->references('id')->on('representantes');
        });

        Schema::table('aportes', function($table) {
            $table->foreign('titulo_id', 'fk_aporte_titulos')
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
        Schema::dropIfExists('aportes');

        Schema::table('aportes', function (Blueprint $table) {
            $table->dropForeign('fk_aporte_users');
            $table->dropForeign('fk_aporte_representantes');
            $table->dropForeign('fk_aporte_titulos');      
        });
    }
}
