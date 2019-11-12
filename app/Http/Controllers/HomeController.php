<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ativos\AtivosExtrato;
use App\Models\SantanderExtrato;
use DB;
use Auth;
use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {        
        
        // $home_graphic = $this->homeGraphics();
        $rendimento_mensal = $this->homeRendimetos();        
        // dd($rendimento_mensal);
        return view('home', compact('home_graphic', 'rendimento_mensal'));
    }


    /**
     * Retorna os valores dos rendimentois diarios das corretoeras .
     *
     * @return string
     */
    // public function homeGraphics(){    
    //     $array_result = DB::table('ativos_extratos')
    //         ->join('titulos','titulo_id', '=', 'titulos.id' )
    //         ->join('representantes','representante_id', '=', 'representantes.id' )
    //         ->join('data_imports','data_import_id', '=', 'data_imports.id' )
    //         ->select('representantes.nome_representante', DB::raw('SUM(valor_bruto_atual) as valor'))
    //         ->where('user_id', Auth::user()->id)         
    //         ->groupBy('representantes.nome_representante')
    //         ->groupBy('data_imports.data_import')
    //         ->orderBy('data_imports.data_import', 'DESC')
    //         ->take(32)
    //         ->get();        
    //         // dd($array_result);
    //     // Tesouro Direto
    //     foreach ($array_result as $value) {            
    //         if(isset($return[trim($value->nome_representante)])){
    //             $return[trim($value->nome_representante)] = $return[trim($value->nome_representante)].", ".$value->valor  ;
    //         }else{
    //             $return[trim($value->nome_representante)] = $value->valor;
    //             $value_day = trim($value->nome_representante).'_day';
    //             $return[$value_day] = number_format($value->valor, 2, ',', '.');
    //         }            
    //     }
        
    //     // Santander
    //     $santander_temp = SantanderExtrato::take(15)->orderBy('documento', 'DESC')->get();
    //     // echo "<pre>";
    //     foreach ($santander_temp as $value) {
    //         $total_temp[] = $value->saldo;
    //         // var_dump("ID:".$value->data." SALDO:".$value->saldo);
    //         if(isset($return["SANTANDER"])){
    //             $return['SANTANDER'] = $return['SANTANDER'].", ".$value->saldo; 
    //         }
    //         else{
    //             $return['SANTANDER_day'] = number_format($value->saldo, 2, ',', '.');
    //             $return['SANTANDER'] = $value->saldo;
    //         }            
    //     }

    //     $array_total = DB::select('SELECT sum(valor_bruto_atual) as valor FROM ativos_extratos where user_id = '.Auth::user()->id.' group by CAST(created_at AS DATE) order by CAST(created_at AS DATE) DESC LIMIT 15 ');
    //     $count = 0;
    //     foreach ($array_total as $value) {                  
    //         if($count == 0){
    //             $return['TOTAL_day'] = number_format($total_temp[0]+$value->valor, 2, ',', '.');
    //         }
    //         if(isset($return['TOTAL'])){
    //             $return['TOTAL'] = $return['TOTAL'].", ".$total_temp[$count]+=$value->valor; 
    //         }else{
    //             $return['TOTAL'] = $total_temp[$count]+=$value->valor;
    //         }
    //         $count++;
    //     }
    //     // dd($return);
    //     return isset($return);
    // }    

    


    public function homeRendimetos (){
        
        // $rows = DB::select("select date_format(created_at,'%m') mes, max(date_format(created_at,'%d')) diamax, min(date_format(created_at,'%d')) diamin from moneyguard_database.ativos_extratos group by date_format(created_at,'%Y-%m') order BY mes DESC LIMIT 0, 3"); 
        $rows = AtivosExtrato::select(DB::raw("date_format(created_at,'%Y-%m') mes, max(date_format(created_at,'%d')) diamax, min(date_format(created_at,'%d')) diamin"))
            ->groupBy(DB::raw("date_format(created_at,'%Y-%m')"))
            ->orderBy('mes', 'DESC')
            ->take(3)
            ->get();
        
        foreach ($rows as $dia){
            $valor_max = AtivosExtrato::select(DB::raw("SUM(valor_bruto_atual) as valor"))
                ->whereRaw("DATE(created_at) = '{$dia->mes}-{$dia->diamax}'")
                ->groupBy(DB::raw('CAST(created_at as DATE)'))
                ->first();

            $valor_min = AtivosExtrato::select(DB::raw("SUM(valor_bruto_atual) as valor"))
                ->whereRaw("DATE(created_at) = '{$dia->mes}-{$dia->diamin}' ")
                ->groupBy(DB::raw('CAST(created_at as DATE)'))
                ->first();                
                $moth = new Carbon($dia->mes);
                $rendimento[$moth->format('F')]['valor'] = number_format($valor_max->valor - $valor_min->valor, 2, ',', '.');            
               if(!isset($rendimento_pivo)){
                    $rendimento_pivo = $valor_max->valor - $valor_min->valor;
                    $mes_pivo = $moth->format('F');
               } else {
                   $rendimento[$mes_pivo]['diferenca_mes'] = number_format($rendimento_pivo - ($valor_max->valor - $valor_min->valor), 2, ',', '.');                   
                   $rendimento_pivo = $valor_max->valor - $valor_min->valor;
                   $mes_pivo = $moth->format('F');
               }
        }
        return isset($rendimento);
    }
}