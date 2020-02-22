<?php

namespace App\Http\Controllers\Config;


use App\Models\User\DashboardConfig;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use App\Models\Parametros\Representantes;
use App\Models\Ativos\AtivosExtrato;



class DashboardConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //        
        // dd(Auth::user()->id);
        // $route = explode("/", \Route::current()->action['prefix'])[0];
        
        // dd($route);
        $userRepresentantes = AtivosExtrato::select('representante_id')
        ->where('user_id', Auth::user()->id)
        ->distinct()
        ->get();
        foreach ($userRepresentantes as $key => $value) { 
            $representantes[$value->representante_id] = $value->representante->nome_representante;
        }
        // dd($userRepresentantes[0]->representante->nome_representante);        
        $representantes = Representantes::pluck('nome_representante', 'id');   
        $representantes[0] = "TODOS"; // ISSO é ganbiarra ?   
        
        //
        $user_representantes = Auth::User()->dashboard(1);
        // dd($user_representantes);
        return view('config.index-dashboard', compact('representantes', 'user_representantes'));
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

        // dashboard_graph
        $request->validate([
            'dashboard_graph' => 'nullable|array'
        ]);        
        
        $userDash = new DashboardConfig();
        $userDash->where('user_id', Auth::user()->id)
            ->where('config_id', '1')
            ->delete();
        if(is_array($request->input('dashboard_graph'))){
            foreach ($request->input('dashboard_graph') as $item) {            
                $userDash = new DashboardConfig();
                $userDash->insert(
                        ['item_id' => $item,
                        'config_id' => '1',
                        'user_id'=> Auth::user()->id
                        ]
                );           
            }  
        }
        

        
        return redirect()->back()->with('success', 'Configurações atualizadas!');   
        // return redirect('home')->with('success', 'lorem');

        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User\DashboardConfig  $DashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function show(DashboardConfig $DashboardConfig)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User\DashboardConfig  $DashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function edit(DashboardConfig $DashboardConfig)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User\DashboardConfig  $DashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DashboardConfig $DashboardConfig)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User\DashboardConfig  $DashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function destroy(DashboardConfig $DashboardConfig)
    {
        //
    }
}
