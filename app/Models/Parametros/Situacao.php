<?php

namespace App\Models\Parametros;

use Illuminate\Database\Eloquent\Model;

class Situacao extends Model
{
    //
    protected $table = 'ativos_situacao';

    protected $dates = [
        'created_at',
        'updated_at',        
    ]; 

    protected $fillable = [
        'nome_situacao',
    ];

      

}
