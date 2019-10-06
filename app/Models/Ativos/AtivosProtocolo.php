<?php

namespace App\Models\Ativos;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class AtivosProtocolo extends Model
{
    //

    protected $dates = [
        'created_at',
        'updated_at',
        'realizacao',
        'liquidacao',
    ];

    // users 
    public function user(){
    	return $this->belongsTo(\App\Models\User::class);
    }
    // titulo
    public function titulo(){
    	return $this->belongsTo(\App\Models\Parametros\Titulos::class);
    }
    // representante
    public function representante(){
    	return $this->belongsTo(\App\Models\Parametros\Representantes::class);
    }
    // Operacao
    public function operacao(){
    	return $this->belongsTo(\App\Models\Parametros\Operacao::class);
    }
    // Situacao
    public function situacao(){
    	return $this->belongsTo(\App\Models\Parametros\Situacao::class);
    }    
    public function data_liquidacao($format = null){
        if ($this->liquidacao->format("Y") != '-0001' ) {
            if($format == 'US'){
                return $this->liquidacao->format('Ymd');
            } else {
                return $this->liquidacao->format('d/m/Y');
            }
        } else {
            return null;
        }
    }
    
}
