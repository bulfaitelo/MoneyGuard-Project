<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataImport extends Model
{
    //
    public $timestamps = false;

    protected $dates = [
        'data_import',
        'data_anterior',        
    ];

    protected $fillable = [
        'data_import',
        'data_anterior',
    ];
}
