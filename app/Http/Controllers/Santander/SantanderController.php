<?php

namespace App\Http\Controllers\Santander;

use App\Models\SantanderExtrato;
use App\Models\SantanderAniversario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Excel;


class SantanderController extends Controller
{

    function __construct()
    {
        /**
         * instanciando objetos
         * @var object
        */
        $this->deleteCount = 0;
        $this->insertCount = 0;

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {        
        return view('santander.index');
    }

    /**
     * Show table on aniversary values 
     *
     * @return \Illuminate\Http\Response
     */
    public function aniversario()
    {
        $aniversarios = SantanderAniversario::OrderBy('data')->get();
        return view('santander.aniversario', compact('aniversarios'));
    }


    /**
     * Show table on movimentation values 
     *
     * @return \Illuminate\Http\Response
     */
    public function movimentacao()
    {
        $movimentacao = SantanderExtrato::OrderBy('data', 'DESC')->where('historico', '!=', 'JUROS')->get();
        return view('santander.movimentacao', compact('movimentacao'));
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Santander  $santander
     * @return \Illuminate\Http\Response
     */
    public function show(Santander $santander)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Santander  $santander
     * @return \Illuminate\Http\Response
     */
    public function edit(Santander $santander)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Santander  $santander
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Santander $santander)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Santander  $santander
     * @return \Illuminate\Http\Response
     */
    public function destroy(Santander $santander)
    {
        //
    }
}
