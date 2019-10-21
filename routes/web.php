<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
// 	return view('welcome');
// });

// Route::get('/adminlte', function () {
// 	return view('base');	
// });

Route::get('/', function () {
	if(!Auth::guest()){
		return redirect('/home');
	} else {
		return redirect()->route('login');	
	}
});

Auth::routes();


Route::group(['middleware'=> 'auth'], function() {
	Route::resource('/test', 'TestController');

	



	// Logs
	Route::group(['prefix' => 'logs'], function() {
		Route::get('/import', 'SqlLogController@importLog')->name('logs.import');
		Route::get('/import/{id}', 'SqlLogController@ShowimportLog')->name('logs.import.show');
		Route::get('/backup', 'SqlLogController@backupLog')->name('logs.backup');
		Route::get('/backup/{id}', 'SqlLogController@ShowbackupLog')->name('logs.backup.show');
		
	});	
		
	// api route
	Route::group(['prefix' => 'api'], function() {
		Route::post('/home_rendimento_bruto', 'HomeApiController@homeGraphicsRemdimentoBruto');
		Route::post('/home_rendimento_liquido', 'HomeApiController@homeGraphicsRemdimentoliquido');		
		Route::post('/santander_rendimento', 'Santander\SantanderApiController@homeGraphicsRemdimento');		
		Route::post('/ativo_preco', 'Ativos\AtivosApiController@homeGraphicsPreco');
	});	

	// Parameters
	Route::group(['prefix' => 'options'], function() {
		Route::resource('/titulo', 'Parameter\TitulosController');
		Route::get('/schedule', 'Sys\scheduleController@index')->name('schedule.index');
		Route::post('/schedule', 'Sys\scheduleController@index')->name('schedule.index');
		Route::get('/schedule/sync', 'Sys\scheduleController@sync')->name('schedule.sync');
	});	

	// Santander
	Route::group(['prefix' => 'santander'], function() {		
		Route::get('', 'Santander\SantanderController@index')->name('santander.index');
		Route::get('/aniversario', 'Santander\SantanderController@aniversario')->name('santander.aniversario');
		Route::get('/movimentacao', 'Santander\SantanderController@movimentacao')->name('santander.movimentacao');
	});	
	
	// Ativos
	Route::group(['prefix' => 'ativos', 'as' => 'ativos.'], function() {
		Route::resource('/dashboard', 'Ativos\AtivosController');	
		Route::resource('/precos', 'Ativos\PrecosTaxasController');		
		Route::resource('/protocolos', 'Ativos\ProtocoloController');		
		Route::resource('/analitico', 'Ativos\AtivosAnaliticoController');		
	});
});

// Home
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/vue', function(){
	return view('vue');
})->name('vue');