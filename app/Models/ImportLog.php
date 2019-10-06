<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImportLog extends Model
{
    protected $table = 'import_log';

    protected $dates = [
        'created_at',
        'updated_at',        
    ];

    public function user()
    {
    	return $this->belongsTo(\App\Models\User::class);
    }
}
