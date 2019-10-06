<?php

namespace App\Models\Ativos;

use Illuminate\Database\Eloquent\Model;

class AtivosPrecosTaxas extends Model
{
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    // titulo
    public function titulo(){
        return $this->belongsTo(\App\Models\Parametros\Titulos::class);
    }

}
