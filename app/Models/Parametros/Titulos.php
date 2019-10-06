<?php

namespace App\Models\Parametros;

use Illuminate\Database\Eloquent\Model;

class Titulos extends Model
{
    //

    protected $dates = [
        'created_at',
        'updated_at',  
        'data_vencimento',      
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome_titulo', 'data_vencimento'
    ];

    /**
     * Retorna o nome definodo em Titulos caso exista. 
     *
     * @return string Nome
     */

    public function nome(){
        if($this->nome_exibicao){
            return $this->nome_exibicao;
        } else {
            return $this->nome_titulo;
        }
    }
}
