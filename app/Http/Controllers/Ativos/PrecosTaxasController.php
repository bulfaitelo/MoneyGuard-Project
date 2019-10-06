<?php

namespace App\Http\Controllers\Ativos;

use Illuminate\Http\Request;
use App\Models\Ativos\AtivosPrecosTaxas;
use App\Http\Controllers\Controller;
Use \App\Models\Parametros\Titulos;
use DB;

class PrecosTaxasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

        $precos = AtivosPrecosTaxas::where(DB::raw("DATE_FORMAT(created_at, '%Y-%m-%d')"),DB::raw("(SELECT MAX(DATE_FORMAT(created_at, '%Y-%m-%d')) FROM ativos_precos_taxas)") )
            ->get();
        return view('ativos.precos.index', compact('precos'));
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
     * @param  \App\Ativos\AtivosPrecosTaxas  $ativosPecosTaxas
     * @return \Illuminate\Http\Response
     */
    public function show($titulo_id,  AtivosPrecosTaxas $ativosPecosTaxas)
    {
        //
        $preco_taxa = $ativosPecosTaxas->where('titulo_id', $titulo_id)
            ->get();
        $titulo = Titulos::find($titulo_id);
        return view('ativos.precos.show', compact('preco_taxa', 'titulo'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Ativos\AtivosPrecosTaxas  $ativosPecosTaxas
     * @return \Illuminate\Http\Response
     */
    public function edit(AtivosPrecosTaxas $ativosPecosTaxas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Ativos\AtivosPrecosTaxas  $ativosPecosTaxas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AtivosPrecosTaxas $ativosPecosTaxas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Ativos\AtivosPrecosTaxas  $ativosPecosTaxas
     * @return \Illuminate\Http\Response
     */
    public function destroy(AtivosPrecosTaxas $ativosPecosTaxas)
    {
        //
    }
}
