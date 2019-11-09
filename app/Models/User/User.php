<?php

namespace App\Models\User;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Retorna a configuração da dashboard quando recebe um parametro
     * @param Var = null
     * @return object / Array
     */
    public function dashboard($config_id = null ) {      
        if(!$config_id){
            return $this->hasMany(\App\Models\User\DashboardConfig::class);
        }
        else{
            $dash = $this->hasMany(\App\Models\User\DashboardConfig::class)
                ->where('config_id', $config_id)            
                ->get();
            foreach ($dash as $key => $value) {
                $dashboard[] = $value->item_id;
            }
            if(isset($dashboard)){
                return $dashboard;
            }        
        }
    }
}
