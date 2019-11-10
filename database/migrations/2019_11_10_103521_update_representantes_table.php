<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateRepresentantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('representantes', function (Blueprint $table) {
            $table->string('nome_exibicao', 180)->nullable()->after('nome_representante');
            $table->string('back_color', 30)->nullable()->after('nome_exibicao');
            $table->string('border_color', 30)->nullable()->after('back_color');;                        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('representantes', function (Blueprint $table) {
            //
        });
    }
}
