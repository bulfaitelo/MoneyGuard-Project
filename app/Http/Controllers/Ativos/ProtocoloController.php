<?php

namespace App\Http\Controllers\Ativos;

use App\Models\Ativos\AtivosProtocolo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Session;
use Notify;



class ProtocoloController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->validate($request, [
            'protocolo'=> 'numeric|nullable',          
            'titulo'=> 'numeric|nullable',
            'operacao'=> 'numeric|nullable',
            'representante'=> 'numeric|nullable',
        ]);
        
        
        $protocolos = AtivosProtocolo::where('user_id', Auth::user()->id)
        // filtros
        ->where(function ($query) use ($request){
            if($request->input('protocolo')){
                $query->where('protocolo', 'LIKE', '%'.$request->input('protocolo').'%');
            }           
        })
        ->where(function ($query) use ($request){
            if($request->input('titulo')){
                $query->where('titulo_id', $request->input('titulo'));
            }           
        })
        ->where(function ($query) use ($request){
            if($request->input('operacao')){
                $query->where('operacao_id', $request->input('operacao'));
            }           
        })
        ->where(function ($query) use ($request){
            if($request->input('representante')){
                $query->where('representante_id', $request->input('representante'));
            }           
        })
        // =====
            ->orderBy('realizacao', 'DESC')
            ->paginate(30);           
        return view('ativos.protocolo.index', compact('protocolos', 'request'));        
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
     * @param  \App\AtivosProtocolo  $ativosProtocolo
     * @return \Illuminate\Http\Response
     */
    public function show($id, AtivosProtocolo $ativosProtocolo)
    {
        //
        $protocolo = $ativosProtocolo->find($id);         
        return view('ativos.protocolo.show', compact('protocolo'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AtivosProtocolo  $ativosProtocolo
     * @return \Illuminate\Http\Response
     */
    public function edit($id, AtivosProtocolo $ativosProtocolo)
    {
        $protocolo = $ativosProtocolo->find($id);         
        return view('ativos.protocolo.edit', compact('protocolo'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AtivosProtocolo  $ativosProtocolo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AtivosProtocolo $ativosProtocolo, $id)
    {
        //
        $save = $ativosProtocolo->findOrFail($id);
        $save->liquidacao = \DateTime::createFromFormat('d/m/Y', $request->input('liquidacao'));         
        $save->correcao = now();
        $check_save = $save->save();
        if($check_save){
            Notify::success('success', "Atualizado com sucesso!");              
            return redirect()->route('protocolos.index'); // Melhorar isso assim que fizer a pagina de perguntas 
    
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AtivosProtocolo  $ativosProtocolo
     * @return \Illuminate\Http\Response
     */
    public function destroy(AtivosProtocolo $ativosProtocolo)
    {
        //
    }
}
