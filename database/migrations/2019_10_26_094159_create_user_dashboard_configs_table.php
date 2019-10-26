<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserDashboardConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_dashboard_configs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('config_id')->unsigned();
            $table->unsignedBigInteger('user_id')->unsigned();
            $table->unsignedBigInteger('item_id')->unsigned();
            $table->timestamps();
        });


        Schema::table('user_dashboard_configs', function($table) {
            $table->foreign('user_id', 'fk_user_dashboard_configs_users')
            ->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_dashboard_configs');
    }
}
