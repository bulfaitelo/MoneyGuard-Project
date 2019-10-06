<?php

namespace App\Models\Parametros;

use Illuminate\Database\Eloquent\Model;

class Operacao extends Model
{
    //
    protected $table = 'ativos_operacao';

    protected $dates = [
        'created_at',
        'updated_at',        
    ]; 

    protected $fillable = [
        'nome_operacao', 
    ];
}
