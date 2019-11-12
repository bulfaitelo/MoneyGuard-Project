<?php

namespace App\Http\Controllers\Sys;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Mail;
use Illuminate\Support\Facades\Storage;
// EMAIL
use App\Mail\SqlBackupLog;
// MODEL
use App\Models\ImportLog;
use App\Models\SqlLog;
use App\Models\User\User;
use App\Models\Ativos\AtivosExtrato;
use App\Models\Ativos\AtivosProtocolo;
use App\Models\Ativos\AtivosPrecosTaxas;
use App\Models\SantanderExtrato;
use App\Models\SantanderAniversario;
use App\Models\Parametros\Representantes;
use App\Models\Parametros\Titulos;
use App\Models\Parametros\Operacao;
use App\Models\Parametros\Situacao;
use App\Models\DataImport;

class scheduleController extends Controller
{

    public function __construct (){
        $this->users = new User();
        $this->log = new ImportLog();         
    }


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->input()){
            
            if($request->input('sync') == 'tesouro_extrato'){    
                $tesouro_extrato_log = app()->call('\App\Http\Controllers\Sys\scheduleController@scheduleTesouroScript');
            }
        }
        $tesouro_extratos = ImportLog::where('categoria_importacao', 'TESOURO DIRETO')
            ->orderBy('created_at', 'DESC')
            ->take(3)
            ->get();
        $tesouro_precos = ImportLog::where('categoria_importacao', 'TESOURO DIRETO PRECO E TAXA')
            ->orderBy('created_at', 'DESC')
            ->take(3)
            ->get();
        $tesouro_investimentos = ImportLog::where('categoria_importacao', 'TESOURO DIRETO INVESTIMENTO')
            ->orderBy('created_at', 'DESC')
            ->take(3)
            ->get();
        $tesouro_resgates = ImportLog::where('categoria_importacao', 'TESOURO DIRETO RESGATE')
            ->orderBy('created_at', 'DESC')
            ->take(3)
            ->get();


        return view('schedule.index', compact('tesouro_extratos', 'tesouro_precos', 'tesouro_investimentos', 'tesouro_resgates', 'tesouro_extrato_log')); 
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function sync()
    {
        return view('schedule.index'); 
    }   

}
