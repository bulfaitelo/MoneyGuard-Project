<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSantanderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('santander_extrato', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->date('data');
            $table->integer('documento');
            $table->string('historico', 250);            
            $table->decimal('valor_movimento', 8, 2);
            $table->decimal('saldo', 8, 2);            
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
        Schema::dropIfExists('santander_extrato');
    }
}
