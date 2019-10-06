<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SantanderAniversario extends Model
{
    protected $table = 'santander_aniversario';

    protected $dates = [
        'created_at',
        'updated_at',        
    ];    
}
