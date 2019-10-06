<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SantanderExtrato extends Model
{
    protected $table = 'santander_extrato';
    
    protected $dates = [
        'created_at',
        'updated_at',        
        'data',        
    ];

}
