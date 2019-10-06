<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Http\Controllers\UserController;
use App\Models\Ativos\AtivosExtrato;
use App\Models\AtivosProtocolo;
use App\Models\SantanderExtrato;
use App\Models\SantanderAniversario;
use App\Models\SantanderLogs;
use App\Models\DataImport;
use \DB;
use App\Models\Mail\SqlBackupLog;
use Mail;
use App\Models\Http\Controllers\HomeApiController;
use Auth;
use Carbon\Carbon;
use App\Models\Http\Controllers\Sys\scheduleController; 
use App\Models\Parametros\Titulos;
use Storage;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AtivosExtrato $ativos, UserController $userController)
    {        
        
        $defaut_connection = config('database.default');
        $database_info = config('database.connections.'.$defaut_connection);
        dd($database_info);
        //     echo "<pre>";
        // foreach($ativos->get() as $ativo){
        //     echo $ativo->valor_bruto_atual;
        //     echo $ativo->valor_investido;
        //     echo $ativo->valor_bruto_atual / $ativo->valor_investido;
        //     echo $ativo->valor_bruto_atual - $ativo->valor_investido;
            
        // }
        //     echo "</pre>";
        // dd('stop');
        // $test = 'thiago';
        // // dd(Storage::url('file.jpg'));
        // $teste = DB::table('users')
        //         ->select(DB::raw("MAX(CAST(REPLACE(name, 'test', '') AS SIGNED))"))
        //         ->where('name', 'like',  "$test%")
        //         ->toSql();
        
        // //$test = Storage::exists('/public/erro_log/aa.jpg');
        // dd($teste);
        //Storage::move('/public/erro_log/ee.jpg', '/public/erro_log/aa   

        // $minMaxRows = DB::table(DB::raw('data_imports'))
        // ->select(DB::raw("MIN(ID) as min_id"), DB::raw('MAX(ID) as max_id'))
        //     ->whereBetween('data_import', ['2018-01-01', '2018-12-10'])
        //     ->groupBy(DB::raw('month(data_import)'));
       
        // $rows =  AtivosExtrato::select('titulo_id',
        //     DB::raw('SUM(CASE WHEN ativos_extratos.data_import_id = borders.min_id THEN valor_bruto_atual END) AS valor_init'),
        //     DB::raw('SUM(CASE WHEN ativos_extratos.data_import_id = borders.max_id THEN valor_bruto_atual END) AS valor_end'),
        //     'data_imports.data_import AS created_at',
        //     DB::raw('month(data_imports.data_import) AS weeknumber')
        //     )
        //     ->join('titulos','titulo_id', '=', 'titulos.id' )
        //     ->join('representantes','representante_id', '=', 'representantes.id' )
        //     ->join('data_imports','data_import_id', '=', 'data_imports.id' )
        //     // ->join(DB::raw("( SELECT 
        //     //                 MIN(ID) as min_id,
        //     //                 MAX(ID) as max_id
        //     //             FROM
        //     //                 data_imports
        //     //             WHERE
        //     //                 data_import BETWEEN '2018-10-01' AND '2018-12-10'
        //     //             GROUP BY month(data_import)
        //     //         ) borders ON ativos_extratos.data_import_id IN (borders.min_id, borders.max_id)"))
            

        //     ->joinSub($minMaxRows, 'borders', function ($join){
        //         // $join->on('ativos_extratos.data_import_id', 'in', "(borders.min_id, borders.max_id')");
        //         $join->raw('ativos_extratos.data_import_id IN (borders.min_id, borders.max_id)');
        //         // $join->raw('ativos_extratos.data_import_id', $minMaxRows);
        //     })
            
            // ->join(DB::raw("
            
            // "), function ($join){
            //     // $join->on('ativos_extratos.data_import_id', 'in', "(borders.min_id, borders.max_id')");
            //     // $join->whereIn('ativos_extratos.data_import_id', '(borders.min_id, borders.max_id)');
            //     $join->on('ativos_extratos.data_import_id', 'borders.min_id')
            //             ->orOn('ativos_extratos.data_import_id', 'borders.max_id');
            // })


            // ->join(
            //     DataImport::select(
            //         DB::raw('MIN(ID) as min_id'),
            //         DB::raw('MAX(ID) as max_id')
            //         )
            //         // ->whereBetween('data_import', [$request->input('start_date'), $request->input('end_date')])
            //         ->whereBetween('data_import', ['2018-01-01', '2018-12-10'])
            //         ->groupBy(DB::raw('GROUP BY month(data_import)')), function ($subJoin ) {
            //             $subJoin->on(db::raw('ativos_extratos.data_import_id IN (borders.min_id, borders.max_id')(borders.min_id, borders.max_id'));
            //         }
            // )
            // ->where('user_id', Auth::user()->id) 
            // // ->whereBetween('data_import', [$request->input('start_date'), $request->input('end_date')])
            // ->whereBetween('data_import', ['2018-01-01', '2018-12-10'])
            // ->groupBy('titulos.nome_titulo')
            // ->groupBy('weeknumber')            
            // ->orderBy('data_import')            
            // ->orderBy('titulos.nome_titulo')
            // ->toSql(); 
            $rows =  DB::select(DB::raw("
            SELECT 
    titulo_id as titulo_id,
-- calculate both SUMs, select values for each dependent by what value it matches to
    SUM(CASE WHEN ativos_extratos.data_import_id = borders.min_id THEN valor_bruto_atual END) AS valor_init,
    SUM(CASE WHEN ativos_extratos.data_import_id = borders.max_id THEN valor_bruto_atual END) AS valor_end,
    
    data_imports.data_import AS created_at,
    month(data_imports.data_import) AS weeknumber
FROM
    ativos_extratos
        INNER JOIN
    titulos ON titulo_id = titulos.id
        INNER JOIN
    representantes ON representante_id = representantes.id
        INNER JOIN
    data_imports ON data_import_id = data_imports.id
-- moved subquery and condition by it from WHERE 
    INNER JOIN ( SELECT 
                    MIN(ID) as min_id,
                    MAX(ID) as max_id
                 FROM
                    data_imports
                 WHERE
                    data_import BETWEEN '2018-10-01' AND '2018-12-10'
                 GROUP BY month(data_import)
               ) borders ON ativos_extratos.data_import_id IN (borders.min_id, borders.max_id)
WHERE	
    user_id = 1
-- removed subquery and condition were there
        AND data_imports.data_import BETWEEN '2018-10-01' AND '2018-12-10'
GROUP BY titulos.nome_titulo , weeknumber
ORDER BY data_import ASC , titulos.nome_titulo ASC
            "));
            // ->get();
        // $rows = AtivosExtrato::query("SELECT 
        //                                     titulo_id as titulo_id,
        //                                 -- calculate both SUMs, select values for each dependent by what value it matches to
        //                                     SUM(CASE WHEN ativos_extratos.data_import_id = borders.min_id THEN valor_bruto_atual END) AS valor_init,
        //                                     SUM(CASE WHEN ativos_extratos.data_import_id = borders.max_id THEN valor_bruto_atual END) AS valor_end,
                                            
        //                                     data_imports.data_import AS created_at,
        //                                     month(data_imports.data_import) AS weeknumber
        //                                 FROM
        //                                     ativos_extratos
        //                                         INNER JOIN
        //                                     titulos ON titulo_id = titulos.id
        //                                         INNER JOIN
        //                                     representantes ON representante_id = representantes.id
        //                                         INNER JOIN
        //                                     data_imports ON data_import_id = data_imports.id
        //                                 -- moved subquery and condition by it from WHERE 
        //                                     INNER JOIN ( SELECT 
        //                                                     MIN(ID) as min_id,
        //                                                     MAX(ID) as max_id
        //                                                 FROM
        //                                                     data_imports
        //                                                 WHERE
        //                                                     data_import BETWEEN '2018-10-01' AND '2018-12-10'
        //                                                 GROUP BY month(data_import)
        //                                             ) borders ON ativos_extratos.data_import_id IN (borders.min_id, borders.max_id)
        //                                 WHERE	
        //                                     user_id = 1
        //                                 -- removed subquery and condition were there
        //                                         AND data_imports.data_import BETWEEN '2018-10-01' AND '2018-12-10'
        //                                 GROUP BY titulos.nome_titulo , weeknumber
        //                                 ORDER BY data_import ASC , titulos.nome_titulo ASC
        //                                 ");

            dd($rows);



// GROUP BY titulos.nome_titulo , weeknumber
// ORDER BY data_import ASC , titulos.nome_titulo ASC



        // $rows =  AtivosExtrato::select(
        //     'ativos_extratos.titulo_id',
        //     DB::raw('SUM(ativos_extratos.valor_bruto_atual) AS valor'),
        //     DB::raw('data_imports_principal.data_import AS created_at'),
        //     DB::raw('(SUM(ativos_extratos.valor_bruto_atual) - (SELECT 
        //                 SUM(ativos_old.valor_bruto_atual)
        //             FROM
        //                 moneyguard_database.ativos_extratos AS ativos_old
        //                     INNER JOIN
        //                 data_imports AS data_imports_old ON data_imports_old.id = ativos_old.data_import_id
        //             WHERE
        //                 data_imports_old.data_import = data_imports_principal.data_anterior
        //                 AND ativos_old.titulo_id = ativos_extratos.titulo_id)) AS diff'),
        //     'ativos_protocolos.operacao_id as operacao_id',
        //     DB::raw('sum(ativos_protocolos.valor_total) as valor_operacao')
        //     )
        //     ->join('titulos', 'titulos.id', '=', 'ativos_extratos.titulo_id')
        //     ->join('data_imports AS data_imports_principal', 'data_imports_principal.id', '=', 'ativos_extratos.data_import_id')
        //     ->leftJoin('ativos_protocolos', function ($join){
        //         $join->on('data_imports_principal.data_import', '=', 'ativos_protocolos.liquidacao');
        //         $join->on('ativos_protocolos.user_id', '=', 'ativos_extratos.user_id');
        //         $join->on('ativos_protocolos.representante_id', '=', 'ativos_extratos.representante_id');
        //         $join->on('ativos_protocolos.titulo_id', '=', 'ativos_extratos.titulo_id');
        //     })
        //     ->where('ativos_extratos.user_id', Auth::user()->id) 
        //     // ->whereBetween('data_imports_principal.data_import', [$request->input('start_date'), $request->input('end_date')])
        //     ->whereBetween('data_imports_principal.data_import', ['2018-12-01', '2018-12-10'])
        //     ->groupBy('titulos.nome_titulo')
        //     ->groupBy('data_imports_principal.data_import')
        //     ->orderBy('data_import')
        //     ->orderBy('titulos.nome_titulo')      
        //     ->get();     
        //     dd($rows);



        // $rows =  AtivosExtrato::select(
        //         'titulo_id', 
        //         DB::raw('SUM(valor_bruto_atual) AS valor'),
        //         'data_imports.data_import as created_at',
        //         DB::raw('month(data_imports.data_import) AS weeknumber')
        //     )
        //     ->join('titulos','titulo_id', '=', 'titulos.id' )
        //     ->join('representantes','representante_id', '=', 'representantes.id' )
        //     ->join('data_imports','data_import_id', '=', 'data_imports.id' )
        //     ->where('user_id', Auth::user()->id) 
        //     ->whereIn('ativos_extratos.data_import_id', 
        //     DataImport::Select(DB::raw('max(ID)'))
        //         ->whereBetween('data_import',  ['2018-01-01', '2018-12-10'])
        //         ->groupBy(db::raw('month(data_import)'))            )
        //     ->whereBetween('data_imports.data_import', ['2018-01-01', '2018-12-10'])
        //     ->groupBy('titulos.nome_titulo')
        //     ->groupBy('weeknumber')            
        //     ->orderBy('data_import')            
        //     ->orderBy('titulos.nome_titulo')
        //     ->get();  

        //     $rows2 =  AtivosExtrato::select(
        //         'titulo_id', 
        //         DB::raw('SUM(valor_bruto_atual) AS valor'),
        //         'data_imports.data_import as created_at',
        //         DB::raw('month(data_imports.data_import) AS weeknumber')
        //     )
        //     ->join('titulos','titulo_id', '=', 'titulos.id' )
        //     ->join('representantes','representante_id', '=', 'representantes.id' )
        //     ->join('data_imports','data_import_id', '=', 'data_imports.id' )
        //     ->where('user_id', Auth::user()->id) 
        //     ->whereIn('ativos_extratos.data_import_id', 
        //     DataImport::Select(DB::raw('min(ID)'))
        //         ->whereBetween('data_import',  ['2018-01-01', '2018-12-10'])
        //         ->groupBy(db::raw('month(data_import)'))            )
        //     ->whereBetween('data_imports.data_import', ['2018-01-01', '2018-12-10'])
        //     ->groupBy('titulos.nome_titulo')
        //     ->groupBy('weeknumber')            
        //     ->orderBy('data_import')            
        //     ->orderBy('titulos.nome_titulo')
        //     ->get(); 
        //     $result = $rows->merge($rows2)

        
        // dd($rows);
     
        // $cmd = 'python C:/wamp64/www/MoneyGuard/pythonGuard/teste.py';
        // echo '<pre>';
        // echo shell_exec($cmd);
        // echo '</pre>';
        // $teste = \Artisan::call('schedule:teste');
        // // $teste = base_path('pythonGuard/teste.py');
        // dd($teste);

        // dd('python C:/wamp64/www/MoneyGuard/pythonGuard/teste.py');
        // $test = Titulos::get()->pluck('nome_titulo', 'id');
       
        // $test = new HomeController;
        // $return = $test->homeGraphicsRemdimentoLiquido();
        // $return = $test->homeGraphicsRemdimentoBruto();
        // dd($test);
    //     $rows = DB::SELECT("SELECT 
    //     titulos.nome_titulo AS titulo,
    //     ativo_principal.titulo_id,
    //     SUM(ativo_principal.valor_bruto_atual) AS valor,
    //     data_imports_principal.data_import AS created_at,
    //     (SUM(ativo_principal.valor_bruto_atual) - (SELECT 
    //             SUM(ativos_old.valor_bruto_atual)
    //         FROM
    //             moneyguard_database.ativos_extratos AS ativos_old
    //                 INNER JOIN
    //             data_imports AS data_imports_old ON data_imports_old.id = ativos_old.data_import_id
    //         WHERE
    //             data_imports_old.data_import = data_imports_principal.data_anterior
    //                 AND ativos_old.titulo_id = ativo_principal.titulo_id)) AS diff
    // FROM
    //     moneyguard_database.ativos_extratos AS ativo_principal
    //         INNER JOIN
    //     titulos ON titulos.id = ativo_principal.titulo_id
    //         INNER JOIN
    //     data_imports AS data_imports_principal ON data_imports_principal.id = ativo_principal.data_import_id
    // WHERE
    //     data_imports_principal.data_import BETWEEN '2018-03-28' AND '2018-04-03'
    // GROUP BY titulos.nome_titulo , data_imports_principal.data_import;");

    // $rows =  AtivosExtrato::select(
    //             'titulo_id',
    //             DB::raw('SUM(ativos_extratos.valor_bruto_atual) AS valor'),
    //             DB::raw('data_imports_principal.data_import AS created_at'),
    //             DB::raw('(SUM(ativos_extratos.valor_bruto_atual) - (SELECT 
    //                         SUM(ativos_old.valor_bruto_atual)
    //                     FROM
    //                         moneyguard_database.ativos_extratos AS ativos_old
    //                             INNER JOIN
    //                         data_imports AS data_imports_old ON data_imports_old.id = ativos_old.data_import_id
    //                     WHERE
    //                         data_imports_old.data_import = data_imports_principal.data_anterior
    //                         AND ativos_old.titulo_id = ativos_extratos.titulo_id)) AS diff'))
    //         ->join('titulos', 'titulos.id', '=', 'ativos_extratos.titulo_id')
    //         ->join('data_imports AS data_imports_principal', 'data_imports_principal.id', '=', 'ativos_extratos.data_import_id')
    //         // ->whereBetween('data_imports_principal.data_import', ['2018-03-28', '2018-04-03'])
    //         ->groupBy('titulos.nome_titulo')
    //         ->groupBy('data_imports_principal.data_import')
    //         ->get();
            
            


    // dd($rows);

    // foreach ($rows as $key => $value) {
    //     dd($value->titulo->nome());
    // }



        // $ativoss = $ativos::select('*')->take(4)->get();
        // foreach ($ativoss as $key => $ativo) {
        //    var_dump($ativo->titulo->nome());

        //     // dd()
        // }

        // $rows =  AtivosExtrato::select('titulo_id','titulos.nome_titulo', DB::raw('SUM(valor_bruto_atual) AS valor'), 'data_imports.data_import as created_at')
        // ->has('titulo')
        // ->where('user_id', Auth::user()->id) 
        // ->whereBetween('data_imports.data_import', [now()->subMonth()->format('Y-m-d'), now()->format('Y-m-d')])
        // ->groupBy('titulos.nome_titulo')
        // ->groupBy('data_imports.data_import')
        // ->orderBy('data_import')
        // ->orderBy('titulos.nome_titulo')  
        // ->join('titulos','titulo_id', '=', 'titulos.id' )
        // ->join('representantes','representante_id', '=', 'representantes.id' )
        // ->join('data_imports','data_import_id', '=', 'data_imports.id' )
        //     ->take(5)          
        //     ->get();
        

        // foreach ($rows as $row) {
        //     var_dump($row->titulo->nome());
        //     dd($row);
        // }
        // $return = Titulos::find(6);
        // dd($return->nome());
        // return view('test');
    //    dd(today());
    //    dd(now());
        // $test = new scheduleController();
        // $return = $test->scheduleTesouroScript();
        // $return = $test->isJSON();

        


        

        // $date_start = Carbon::parse('2018-05-01');
        // $date_end = Carbon::parse('2018-05-14');
        
        // $lengh = $date_start->diffInDays($date_end);
        // $day = 0;
        // for ($i=0; $i <= $lengh ; $i++) { 
        //     $date = $date_start->addDay($day)->format('Y-m-d');

            // $extrato_row = DB::select("SELECT 
            //                                 `titulo`,
            //                                 `valor_bruto_atual` AS valor,
            //                                 DATE(created_at) AS date,
            //                                 (valor_bruto_atual - (SELECT 
            //                                         valor_bruto_atual
            //                                     FROM
            //                                         moneyguard_database.ativos_extratos AS sub_ativos_extrato
            //                                     WHERE
            //                                         DATE(`created_at`) = (SELECT 
            //                                                 DATE(created_at)
            //                                             FROM
            //                                                 moneyguard_database.ativos_extratos AS ativos_date
            //                                             WHERE
            //                                                 DATE(ativos_date.created_at) < '".$date."'
            //                                             ORDER BY created_at DESC
            //                                             LIMIT 1)
            //                                             AND sub_ativos_extrato.titulo = ativos_extratos_principal.titulo
            //                                     GROUP BY `titulo`
            //                                     ORDER BY `titulo` ASC)) AS subtration
            //                             FROM
            //                                 moneyguard_database.ativos_extratos AS ativos_extratos_principal
            //                             WHERE
            //                                 DATE(`created_at`) = '".$date."'
            //                             GROUP BY `titulo` , CAST(created_at AS DATE)
            //                             ORDER BY created_at , `titulo` ASC");  


            // if($day == 0){
            //     $day = 1;
            // }

            // if(($extrato_row)){
            //     $extrato_array[$date] = $extrato_row;
            // }

        // var_dump($extrato_row->created_at)    ;
        // }
        // var_dump($extrato_row);
        // dd($extrato_array);
        // $teste = \App\SantanderLogs::firstOrCreate(['tipo_erro'=> 'TESTE', 'user_id' => '1',  'log' => 'teste']);

        // dd($teste->id);
        
        // dd($rowSubDay);
        
        // $json = '[ {"inicio": "2018-05-10 15:21:35.266130"},
        // {"extrato" : [
        // { "user_id": "1", "data": "2018-04-23 00:00:00", "documento": "000000936",  "historico": "JUROS", "valor_movimento": "1.20", "saldo": "2700.37"},{ "user_id": "1", "data": "2018-04-30 00:00:00", "documento": "000000937",  "historico": "JUROS", "valor_movimento": "0.51", "saldo": "2700.88"},{ "user_id": "1", "data": "2018-05-02 00:00:00", "documento": "000000938",  "historico": "JUROS", "valor_movimento": "1.95", "saldo": "2702.83"},{ "user_id": "1", "data": "2018-05-02 00:00:00", "documento": "000000939",  "historico": "JUROS", "valor_movimento": "0.78", "saldo": "2703.61"},{ "user_id": "1", "data": "2018-05-03 00:00:00", "documento": "000000940",  "historico": "JUROS", "valor_movimento": "0.60", "saldo": "2704.21"},{ "user_id": "1", "data": "2018-05-04 00:00:00", "documento": "000000941",  "historico": "JUROS", "valor_movimento": "2.03", "saldo": "2706.24"},{ "user_id": "1", "data": "2018-05-04 00:00:00", "documento": "000000942",  "historico": "RETIRADA CX", "valor_movimento": "-600.00", "saldo": "2106.24"},{ "user_id": "1", "data": "2018-05-07 00:00:00", "documento": "000000943",  "historico": "JUROS", "valor_movimento": "0.76", "saldo": "2107.00"},{ "user_id": "1", "data": "2018-05-07 00:00:00", "documento": "000000944",  "historico": "JUROS", "valor_movimento": "0.68", "saldo": "2107.68"},{ "user_id": "1", "data": "2018-05-07 00:00:00", "documento": "000000945",  "historico": "JUROS", "valor_movimento": "0.52", "saldo": "2108.20"},{ "user_id": "1", "data": "2018-05-08 00:00:00", "documento": "000000946",  "historico": "JUROS", "valor_movimento": "0.58", "saldo": "2108.78"},{ "user_id": "1", "data": "2018-05-09 00:00:00", "documento": "000000947",  "historico": "JUROS", "valor_movimento": "0.22", "saldo": "2109.00"},{ "user_id": "1", "data": "2018-05-09 00:00:00", "documento": "000000948",  "historico": "JUROS", "valor_movimento": "0.25", "saldo": "2109.25"}
        // ]},
        // {"aniversario": [
        // { "user_id": "1", "data": "01", "valor": "527.19"}, { "user_id": "1", "data": "02", "valor": "210.27"},{ "user_id": "1", "data": "03", "valor": "110.51"}, { "user_id": "1", "data": "04", "valor": "0.00"},{ "user_id": "1", "data": "05", "valor": "205.31"}, { "user_id": "1", "data": "06", "valor": "184.35"},{ "user_id": "1", "data": "07", "valor": "141.67"}, { "user_id": "1", "data": "08", "valor": "155.82"},{ "user_id": "1", "data": "09", "valor": "44.68"}, { "user_id": "1", "data": "09", "valor": "67.40"},{ "user_id": "1", "data": "10", "valor": "0.00"}, { "user_id": "1", "data": "11", "valor": "0.00"},{ "user_id": "1", "data": "12", "valor": "0.00"}, { "user_id": "1", "data": "13", "valor": "0.00"},{ "user_id": "1", "data": "14", "valor": "0.00"}, { "user_id": "1", "data": "15", "valor": "0.00"},{ "user_id": "1", "data": "16", "valor": "0.00"}, { "user_id": "1", "data": "17", "valor": "0.00"},{ "user_id": "1", "data": "18", "valor": "0.00"}, { "user_id": "1", "data": "20", "valor": "0.00"},{ "user_id": "1", "data": "21", "valor": "0.00"}, { "user_id": "1", "data": "22", "valor": "0.00"},{ "user_id": "1", "data": "23", "valor": "325.21"}, { "user_id": "1", "data": "28", "valor": "136.84"}
        // ]},
        // {"fim": "2018-05-10 15:22:47.564721"} ]';
        

        // $jsonError = '[ {"inicio": "2018-05-10 15:19:02.001889"},
        // Traceback (most recent call last):
        //   File "santander.py", line 45, in <module>
        //     firefox.switch_to.default_content()
        //   File "C:\Program Files (x86)\Python36-32\lib\site-packages\selenium\webdriver\r
        //     self._driver.execute(Command.SWITCH_TO_FRAME, {"id": None})
        //   File "C:\Program Files (x86)\Python36-32\lib\site-packages\selenium\webdriver\r
        //     self.error_handler.check_response(response)
        //   File "C:\Program Files (x86)\Python36-32\lib\site-packages\selenium\webdriver\r
        //     raise exception_class(message, screen, stacktrace, alert_text)
        // selenium.common.exceptions.UnexpectedAlertPresentException: Alert Text: None
        // Message:';


        // dd($test->isJSON($jsonError));
        // return view ('emails.sql');

        // SQL CORRETA 
/*
        select `titulo`, `valor_bruto_atual` as valor, date(created_at) as date, ((
            select valor_bruto_atual 
            FROM moneyguard_database.ativos_extratos as sub_ativos_extrato 
            where date(`created_at`) = (
                select date(created_at) 
                from moneyguard_database.ativos_extratos as ativos_date
                where date(created_at) < created_at
                order by created_at desc
                limit 1        
            ) and sub_ativos_extrato.titulo = ativos_extratos_principal.titulo 
            group by `titulo` 
            order by `titulo` asc
        ) - valor_bruto_atual) as subtration
        from moneyguard_database.ativos_extratos as ativos_extratos_principal
        -- where date(`created_at`) between '2018-05-09' and '2018-05-10'
        where date(`created_at`) = '2018-05-10' 
        group by `titulo`, CAST(created_at as DATE)
        order by created_at, `titulo` asc; */
        // ==================================

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
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
