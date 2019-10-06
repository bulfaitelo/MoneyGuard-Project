<?php

namespace App\Models\Parametros;

use Illuminate\Database\Eloquent\Model;

class Representantes extends Model
{
    //


    protected $dates = [
        'created_at',
        'updated_at',        
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome_representante'
    ];
}
