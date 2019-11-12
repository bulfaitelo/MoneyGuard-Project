<?php

namespace App\Http\Controllers\Parameter;

use App\Models\Parametros\Representantes;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class RepresentantesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $representantes = Representantes::orderBy('nome_representante', 'DESC')
        ->paginate(30);

        return view('parameter.index_representantes', compact('representantes'));
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $representante = Representantes::findOrFail($id);
        
        return view('parameter.edit_representante', compact('representante'));    
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Representantes $representantes, $id)
    {
        //

        $save = $representantes->findOrFail($id);
        $save->nome_exibicao = $request->input('nome_exibicao');
        $save->back_color = $request->input('back_color');
        $save->border_color = $request->input('border_color');
        $check_save = $save->save();
        if($check_save){
            return redirect()->back()->with('success', 'Representante atualiado!');       
        }
       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
