<?php

namespace App\Http\Controllers\User;


use App\Models\User\UserDashboardConfig;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use App\Models\Parametros\Representantes;
use App\Models\Ativos\AtivosExtrato;



class UserDashboardConfigController extends Controller
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
        return view('config.index-dashboard', compact('representantes'));
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

        // dashborard_graph
        $request->validate([
            'dashborard_graph' => 'nullable|array'
        ]);

        // Auth:user()->dashboard()->sync($itens, ['config_id' => 1]);
        $userDash = new UserDashboardConfig();
        $userDash->where('user_id', Auth::user()->id)
            ->where('config_id', '1')
            ->delete();
        foreach ($request->input('dashborard_graph') as $item) {            
            $userDash = new UserDashboardConfig();
            $userDash->insert(
                    ['item_id' => $item,
                    'config_id' => '1',
                    'user_id'=> Auth::user()->id
                    ]
            );           
        }         
        

        
        return redirect()->back()->with('success', 'Foi');   
        // return redirect('home')->with('success', 'lorem');

        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User\UserDashboardConfig  $userDashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function show(UserDashboardConfig $userDashboardConfig)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User\UserDashboardConfig  $userDashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function edit(UserDashboardConfig $userDashboardConfig)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User\UserDashboardConfig  $userDashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserDashboardConfig $userDashboardConfig)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User\UserDashboardConfig  $userDashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserDashboardConfig $userDashboardConfig)
    {
        //
    }
}
