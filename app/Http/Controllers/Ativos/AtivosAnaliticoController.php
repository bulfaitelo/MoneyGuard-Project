<?php

namespace App\Http\Controllers\Ativos;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Ativos\AtivosExtrato;
Use \App\Models\Parametros\Titulos;
use DB;

class AtivosAnaliticoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $ativos = AtivosExtrato::select('titulo_id', DB::raw('sum(valor_investido) valor_investido'), DB::raw('SUM(valor_bruto_atual) valor_bruto_atual'), DB::raw('sum(valor_liquido_atual) valor_liquido_atual'), 'created_at')
            ->where('data_import_id', db::raw('(select MAX(data_import_id) from ativos_extratos)'))
            ->where('user_id', \Auth::user()->id)
            ->groupBy('titulo_id')
            ->get();          
        //SELECT *, MAX(ativos_extratos.created_at) FROM moneyguard_database.ativos_extratos group by titulo_id, representante_id;
        $titulo = null;
        return view ('ativos.analitico.index', compact('ativos', 'titulo', 'request'));
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
     * @param  \App\AtivosExtrato  $ativosExtrato
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {

        $test = '{
            "labels": [
                "Valor Investido",
                "Valor Bruto",
                "Rendimento"
            ],
            "datasets": [{
                "backgroundColor": ["rgba(219,30,110,0.2)", "rgba(100,30,110,0.2)", "rgba(30,30,110,0.2)"],
                "data": [15, 30, 123]
            }]
        }';
        // dd(json_decode($test));
        $ativos = AtivosExtrato::where('data_import_id', db::raw('(select MAX(data_import_id) from ativos_extratos)'))
            ->where('titulo_id', $id)
            ->where('user_id', \Auth::user()->id)            
            ->get();                 
        $titulo = Titulos::find($id);
        // montando jSon
        foreach ($ativos as $ativosJson) {
            $json[$ativosJson->representante_id] = (object) array(
                'labels'=>  ["Valor Investido", "Valor Bruto", "Rendimento"],
                'datasets'=> [
                    [
                        "backgroundColor" => ["rgba(196, 196, 196, 0.2)", $ativosJson->titulo->border_color, $ativosJson->titulo->back_color],
                        "data" => [
                            $ativosJson->valor_investido,
                            $ativosJson->valor_bruto_atual,
                            number_format($ativosJson->valor_bruto_atual - $ativosJson->valor_investido, 2, '.', '')
                        ]
                    ]
                ]
             );
        }                
        return view ('ativos.analitico.show', compact('ativos', 'titulo', 'json'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AtivosExtrato  $ativosExtrato
     * @return \Illuminate\Http\Response
     */
    public function edit(AtivosExtrato $ativosExtrato)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AtivosExtrato  $ativosExtrato
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AtivosExtrato $ativosExtrato)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AtivosExtrato  $ativosExtrato
     * @return \Illuminate\Http\Response
     */
    public function destroy(AtivosExtrato $ativosExtrato)
    {
        //
    }
}
