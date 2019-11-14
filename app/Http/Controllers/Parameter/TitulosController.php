<?php

namespace App\Http\Controllers\Parameter;

use App\Models\Parametros\Titulos;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Session;

class TitulosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $titulos = Titulos::orderBy('nome_titulo', 'DESC')
        ->paginate(30);

        return view('parameter.index_titulos', compact('titulos'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Parametros\Titulos  $titulos
     * @return \Illuminate\Http\Response
     */
    public function show(Titulos $titulos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Parametros\Titulos  $titulos
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $titulo = Titulos::findOrFail($id);
        
        return view('parameter.edit_titulo', compact('titulo'));        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Parametros\Titulos  $titulos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Titulos $titulos, $id)
    {
        
        $save = $titulos->findOrFail($id);
        $save->nome_exibicao = $request->input('nome_exibicao');
        $save->back_color = $request->input('back_color');
        $save->border_color = $request->input('border_color');
        $check_save = $save->save();
        if($check_save){
            return redirect()->back()->with('success', 'Representante atualiado!');       
            return redirect()->route('titulo.index'); // Melhorar isso assim que fizer a pagina de perguntas     
        }



    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Parametros\Titulos  $titulos
     * @return \Illuminate\Http\Response
     */
    public function destroy(Titulos $titulos)
    {
        //
    }
}
