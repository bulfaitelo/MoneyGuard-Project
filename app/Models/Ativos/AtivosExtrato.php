<?php

namespace App\Models\Ativos;

use Illuminate\Database\Eloquent\Model;

class AtivosExtrato extends Model
{
    //
    
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    // users 
    public function user(){
    	return $this->belongsTo(\App\Models\User::class);
    }

    public function titulo(){
    	return $this->belongsTo(\App\Models\Parametros\Titulos::class);
    }

    public function representante(){
    	return $this->belongsTo(\App\Models\Parametros\Representantes::class);
    }
    
    public function data(){
        return $this->belongsTo(\App\Models\DataImport::class);
    }

}
