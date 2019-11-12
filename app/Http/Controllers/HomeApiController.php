<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\Ativos\AtivosExtrato;
use App\Models\Ativos\AtivosProtocolo;
use App\Models\DataImport;
use App\Models\Parametros\Titulos;

use DB;

class HomeApiController extends Controller
{
    /**
     * Retorna os valores dos Rendimento Bruto diarios das corretoeras para o charts.js.
     *
     * @return string
     */
    public function homeGraphicsRendimentoBruto(Request $request){

        $this->validate($request, [
            'start_date' =>'required|date', 
            'end_date' =>'required|date', 
        ]);

        $arrayMonth = [
            '1' => 'Janeiro',
            '2' => 'Fevereiro',
            '3' => 'Março',
            '4' => 'Abril',
            '5' => 'Maio',
            '6' => 'Junho',
            '7' => 'Julho',
            '8' => 'Agosto',
            '9' => 'Setembro',
            '10' => 'Outubro',
            '11' => 'Novembro',
            '12' => 'Dezembro',
        ];

        if($request->input('group_bruto')){
            $groupRange = $request->input('group_bruto');
        } else {
            $groupRange = 'day';
        }

        if ($groupRange == 'day') {
            $rows =  AtivosExtrato::select(
                    'titulo_id', DB::raw('SUM(valor_bruto_atual) AS valor'),
                    'data_imports.data_import as created_at'               
                )
                ->join('titulos','titulo_id', '=', 'titulos.id' )
                ->join('representantes','representante_id', '=', 'representantes.id' )
                ->join('data_imports','data_import_id', '=', 'data_imports.id' )
                ->where('user_id', Auth::user()->id) 
                ->whereBetween('data_imports.data_import', [$request->input('start_date'), $request->input('end_date')])
                ->groupBy('titulos.nome_titulo')      
                ->groupBy('data_imports.data_import')
                ->orderBy('data_import')
                
                ->orderBy('titulos.nome_titulo')
                ->get();   
            
        }
        if($groupRange == 'week'){

            $rows =  AtivosExtrato::select(
                'titulo_id', 
                DB::raw('SUM(valor_bruto_atual) AS valor'),
                'data_imports.data_import as created_at',
                DB::raw('WEEK(data_imports.data_import) AS weeknumber')
            )
            ->join('titulos','titulo_id', '=', 'titulos.id' )
            ->join('representantes','representante_id', '=', 'representantes.id' )
            ->join('data_imports','data_import_id', '=', 'data_imports.id' )
            ->where('user_id', Auth::user()->id) 
            ->whereIn('ativos_extratos.data_import_id', 
            DataImport::Select(DB::raw('max(ID)'))
                ->whereBetween('data_import',  [$request->input('start_date'), $request->input('end_date')])
                ->groupBy(db::raw('Week(data_import)'))            )
                ->whereBetween('data_imports.data_import', [$request->input('start_date'), $request->input('end_date')])
            ->groupBy('titulos.nome_titulo')
            ->groupBy('weeknumber')            
            ->orderBy('data_import')            
            ->orderBy('titulos.nome_titulo')
            ->get();  

        }
        if($groupRange == 'month'){
            $rows =  AtivosExtrato::select(
                'titulo_id', 
                DB::raw('SUM(valor_bruto_atual) AS valor'),
                'data_imports.data_import as created_at',
                DB::raw('month(data_imports.data_import) AS weeknumber')
            )
            ->join('titulos','titulo_id', '=', 'titulos.id' )
            ->join('representantes','representante_id', '=', 'representantes.id' )
            ->join('data_imports','data_import_id', '=', 'data_imports.id' )
            ->where('user_id', Auth::user()->id) 
            ->whereIn('ativos_extratos.data_import_id', 
            DataImport::Select(DB::raw('max(ID)'))
                ->whereBetween('data_import',  [$request->input('start_date'), $request->input('end_date')])
                ->groupBy(db::raw('month(data_import)'))            )
                ->whereBetween('data_imports.data_import', [$request->input('start_date'), $request->input('end_date')])
            ->groupBy('titulos.nome_titulo')
            ->groupBy('weeknumber')            
            ->orderBy('data_import')            
            ->orderBy('titulos.nome_titulo')
            ->get();  
        }
        

            
            if(count($rows)> 0){
                $temp_date = null;
                $text_label = '[';
                foreach ($rows as $row) {
                    if($row->created_at != $temp_date){
                        $labels[] = $row->created_at;  
                        if($groupRange == 'day'){
                            $text_label.='"'.$row->created_at->format('d/m/Y').'",';
                        }
                        if($groupRange == 'week'){
                            $text_label.='"'.$row->weeknumber.'",';
                        }
                        if($groupRange == 'month'){                            
                            $text_label.='"'.$arrayMonth[$row->weeknumber].'",';
                        }
                    }
                    $valor_titulo[$row->titulo->nome()][$row->created_at->format('Y-m-d')] = $row->valor;
                    if ($row->titulo->back_color == null) {
                        $row->titulo->back_color = 'rgba(0,0,0,0)';
                    }
                    $valor_titulo[$row->titulo->nome()]['border_color'] = $row->titulo->back_color;
                    $valor_titulo[$row->titulo->nome()]['back_color'] = $row->titulo->border_color;

                    $temp_date = $row->created_at;
                }
                // removendo a virgula 
                $text_label = substr($text_label, 0, -1);
                $text_label.=']';
                // percorrendo os valores
                foreach ($valor_titulo as $titulo => $valores) {
                    // percorrendo as datas 
                    foreach ($labels as $data) {
                        if(!array_key_exists($data->format('Y-m-d'), $valor_titulo[$titulo])){
                            $valor_titulo[$titulo][$data->format('Y-m-d')] = 'null';
                        }                   
                    }
                    ksort($valor_titulo[$titulo]);
                }
                // dd($valor_titulo);
                $request_hidden = json_decode($request->input('hidden_response'));
                $text_datasets='';
                // montando json
                foreach ($valor_titulo as $titulo => $valores) { 
                    $text_datasets.='{';
                    $text_datasets.='"label": "'.$titulo.'",';     
                    // filtro dos itens desabilitados 
                    // dd(is_object($request_hidden));
                    if(is_object($request_hidden)){
                        if(array_key_exists($titulo, $request_hidden)){
                            // dd(array_key_exists($titulo, $request_hidden));
                            if($request_hidden->$titulo == true ){
                                
                                $text_datasets.='"hidden": true,';
                            }
                        }
                    }              
                    $text_datasets.='"backgroundColor" : "'.$valores['back_color'].'",';
                    $text_datasets.='"borderColor" : "'.$valores['border_color'].'",';
                    $text_datasets.='"data" : [';
                    
                    foreach ($valores as $valor_key => $valor) {                      
                        if(($valor_key != 'back_color') && ($valor_key!= 'border_color')){
                            $text_datasets.=$valor.',';
                        }
                    }
                    $text_datasets = substr($text_datasets, 0, -1);
                    $text_datasets.=']},';                
                }
                // removendo a virgula 
                $text_datasets = substr($text_datasets, 0, -1);
                $return_json = '{"labels": '.$text_label.', "datasets": ['.$text_datasets.']}';
                return response($return_json); 
            }else{
                $return_json = '{ "datasets": null }';
                return response($return_json);                        
            }
        
    }


    /**
     * Retorna os valores dos Rendimento liquido  diarios das corretoeras para o charts.js.
     *
     * @return string
     */
    public function homeGraphicsRendimentoLiquido (Request $request){
        // dd($request->input());

        $this->validate($request, [
            'start_date' =>'required|date', 
            'end_date' =>'required|date', 
        ]);

        $arrayMonth = [
            '1' => 'Janeiro',
            '2' => 'Fevereiro',
            '3' => 'Março',
            '4' => 'Abril',
            '5' => 'Maio',
            '6' => 'Junho',
            '7' => 'Julho',
            '8' => 'Agosto',
            '9' => 'Setembro',
            '10' => 'Outubro',
            '11' => 'Novembro',
            '12' => 'Dezembro',
        ];
    

        if($request->input('group_liquido')){
            $groupRange = $request->input('group_liquido');
        } else {
            $groupRange = 'day';
        }
        
        if($groupRange == 'day'){
            $rows =  AtivosExtrato::select(
                'ativos_extratos.titulo_id',
                DB::raw('SUM(ativos_extratos.valor_bruto_atual) AS valor'),
                DB::raw('data_imports_principal.data_import AS created_at'),
                DB::raw('(SUM(ativos_extratos.valor_bruto_atual) - (SELECT 
                            SUM(ativos_old.valor_bruto_atual)
                        FROM
                            moneyguard_database.ativos_extratos AS ativos_old
                                INNER JOIN
                            data_imports AS data_imports_old ON data_imports_old.id = ativos_old.data_import_id
                        WHERE
                            data_imports_old.data_import = data_imports_principal.data_anterior
                            AND ativos_old.titulo_id = ativos_extratos.titulo_id)) AS diff'),
                'ativos_protocolos.operacao_id as operacao_id',
                DB::raw('sum(ativos_protocolos.valor_total) as valor_operacao')
                )
                ->join('titulos', 'titulos.id', '=', 'ativos_extratos.titulo_id')
                ->join('data_imports AS data_imports_principal', 'data_imports_principal.id', '=', 'ativos_extratos.data_import_id')
                ->leftJoin('ativos_protocolos', function ($join){
                    $join->on('data_imports_principal.data_import', '=', 'ativos_protocolos.liquidacao');
                    $join->on('ativos_protocolos.user_id', '=', 'ativos_extratos.user_id');
                    $join->on('ativos_protocolos.representante_id', '=', 'ativos_extratos.representante_id');
                    $join->on('ativos_protocolos.titulo_id', '=', 'ativos_extratos.titulo_id');
                })
                ->where('ativos_extratos.user_id', Auth::user()->id) 
                ->whereBetween('data_imports_principal.data_import', [$request->input('start_date'), $request->input('end_date')])
                ->groupBy('titulos.nome_titulo')
                ->groupBy('data_imports_principal.data_import')
                ->orderBy('data_import')
                ->orderBy('titulos.nome_titulo')      
                ->get();                              
            // montando o json            
                if(count($rows) > 0){            
                    $temp_date = null;
                    $text_label = '[';
                    foreach ($rows as $key => $row) {                 
                        if($row->created_at != $temp_date){                            
                            $labels[] = $row->created_at;                              
                            $text_label.='"'.$row->created_at->format('d/m/Y').'",';                            
                        }
                        
                        if($row->diff == null){                        
                            $valor_titulo[$row->titulo->nome()][$row->created_at->format('Y-m-d')] = 'null';
                        } else {
                            // Adicionando aportes 
                            if($request->input('check_movimento') == 'true' ){
                                if(($row->operacao_id) || ($row->valor_operacao)){
                                    // dd($row);
                                    /* 
                                    1 INVESTIMENTO
                                    2 RESGATE
                                    */
                                    if($row->operacao_id == 1){
                                        $row->diff = $row->diff - $row->valor_operacao;
                                    }
                                    elseif($row->operacao_id == 2){
                                        $row->diff = $row->diff + $row->valor_operacao;
                                    }
                                }
                            }
                            $valor_titulo[$row->titulo->nome()][$row->created_at->format('Y-m-d')] = $row->diff;
                        }
                        if ($row->titulo->back_color == null) {
                            $row->titulo->back_color = 'rgba(0,0,0,0)';
                        }
                        $valor_titulo[$row->titulo->nome()]['border_color'] = $row->titulo->back_color;
                        $valor_titulo[$row->titulo->nome()]['back_color'] = $row->titulo->border_color;
    
                        $temp_date = $row->created_at;
                        
                    }
                    // removendo a virgula 
                    $text_label = substr($text_label, 0, -1);
                    $text_label.=']';
                    // percorrendo os valores
                    // dd($text_label);
                    // dd($valor_titulo);
                    
                    foreach ($valor_titulo as $titulo => $valores) {
                        // percorrendo as datas 
                        foreach ($labels as $data) {
                            if(!array_key_exists($data->format('Y-m-d'), $valor_titulo[$titulo])){
                                $valor_titulo[$titulo][$data->format('Y-m-d')] = 'null';
                            }                   
                        }
                        ksort($valor_titulo[$titulo]);
                    }
                    
                    $text_datasets='';
                    $request_hidden = json_decode($request->input('hidden_response'));
                    // montando json
                    // dd($valor_titulo);
                    foreach ($valor_titulo as $titulo => $valores) {                     
                        $text_datasets.='{';
                        $text_datasets.='"label": "'.$titulo.'",';         
                        // filtro dos itens desabilitados 
                        // dd(is_object($request_hidden));
                        if(is_object($request_hidden)){
                            if(array_key_exists($titulo, $request_hidden)){
                                // dd(array_key_exists($titulo, $request_hidden));
                                if($request_hidden->$titulo == true ){
                                    
                                    $text_datasets.='"hidden": true,';
                                }
                            }
                        }           
                        $text_datasets.='"backgroundColor" : "'.$valores['back_color'].'",';
                        $text_datasets.='"borderColor" : "'.$valores['border_color'].'",';
                        $text_datasets.='"data" : [';
                        
                        foreach ($valores as $valor_key => $valor) {
                            if(($valor_key != 'back_color') && ($valor_key!= 'border_color')){
                                $text_datasets.=$valor.',';
                            }
                        }
                        $text_datasets = substr($text_datasets, 0, -1);
                        $text_datasets.=']},';                
                    }
                    // removendo a virgula 
                    $text_datasets = substr($text_datasets, 0, -1);
                    $return_json = '{"labels": '.$text_label.', "datasets": ['.$text_datasets.']}';
                    // dd($return_json);
                    return $return_json; 
                }else{
                    $return_json = '{ "datasets": null }';
                    return $return_json;                        
                }
        }

        if($groupRange == 'week'){

            $rows =  DB::select(DB::raw("
            SELECT 
                    titulo_id as titulo_id,
                -- calculate both SUMs, select values for each dependent by what value it matches to
                (SUM(CASE WHEN ativos_extratos.data_import_id = borders.max_id THEN valor_bruto_atual END) -
                SUM(CASE WHEN ativos_extratos.data_import_id = borders.min_id THEN valor_bruto_atual END)) as diff,                    
                    data_imports.data_import AS created_at,
                    week(data_imports.data_import) AS weeknumber,
                    year(data_imports.data_import) AS yearnumber
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
                                    data_import BETWEEN '".$request->input('start_date')."' AND '".$request->input('end_date')."'
                                GROUP BY week(data_import)
                            ) borders ON ativos_extratos.data_import_id IN (borders.min_id, borders.max_id)
                WHERE	
                    user_id = ".Auth::user()->id."
                -- removed subquery and condition were there
                        AND data_imports.data_import BETWEEN '".$request->input('start_date')."' AND '".$request->input('end_date')."'
                GROUP BY titulos.nome_titulo , weeknumber
                ORDER BY data_import ASC , titulos.nome_titulo ASC
            "));           
            
            if(count($rows)> 0){            
                $temp_date = null;
                $text_label = '[';
                foreach ($rows as $key => $row) {                 
                    if($row->weeknumber != $temp_date){                        
                        $labels[] = $row->weeknumber; 
                        $text_label.='"'.$row->weeknumber.'",';                                           
                    }
                    
                    $titulosModel = new Titulos();
                    $tituloModel = $titulosModel->find($row->titulo_id);
                    if($row->diff == null){
                        $valor_titulo[$tituloModel->nome()][$row->weeknumber] = 'null';
                    } else {
                        // Adicionando aportes 
                        if($request->input('check_movimento') == 'true' ){

                            $rowProtocolo =  AtivosProtocolo::select(
                                'operacao_id',
                                db::raw('SUM(valor_total) as valor_operacao'))
                                ->where('user_id', Auth::user()->id) 
                                ->where('titulo_id', $row->titulo_id ) 
                                ->where(db::raw('week(liquidacao)'), $row->weeknumber)
                                ->where(db::raw('Year(liquidacao)'), $row->yearnumber)
                                ->groupBy('titulo_id')
                                ->get();
                                // dd($row->weeknumber);
                                if(count($rowProtocolo)> 0){
                                    foreach ($rowProtocolo as $key => $value) {                                        
                                        if(($value->operacao_id) && ($value->valor_operacao)){
                                            // dd($row);
                                            /* 
                                            1 INVESTIMENTO
                                            2 RESGATE
                                            */
                                            if($value->operacao_id == 1){
                                                // var_dump(" Valor: ".$value->valor_operacao);
                                                // var_dump(" Mes: ".$row->weeknumber);
                                                // var_dump(" tituloid: ".$row->titulo_id);
                                                // dd($value->operacao_id);
                                                $row->diff = $row->diff - $value->valor_operacao;
                                            }
                                            elseif($value->operacao_id == 2){
                                                $row->diff = $row->diff + $value->valor_operacao;
                                            }
                                        }                                        
                                    }
                                }

                            // SELECT operacao_id, SUM(valor_total) as valor_total,  ativos_protocolos.* 
                            // FROM moneyguard_database.ativos_protocolos
                            // INNER JOIN
                            //     `titulos` ON `titulo_id` = `titulos`.`id`  
                            // where 
                            // titulo_id = 4 and 
                            // week(liquidacao) = 7
                            // group by titulo_id




                            
                        }
                        $valor_titulo[$tituloModel->nome()][$row->weeknumber] = $row->diff;
                    }


                    if ($tituloModel->back_color == null) {
                        $tituloModel->back_color = 'rgba(0,0,0,0)';
                    }
                    $valor_titulo[$tituloModel->nome()]['border_color'] = $tituloModel->back_color;
                    $valor_titulo[$tituloModel->nome()]['back_color'] = $tituloModel->border_color;

                    $temp_date = $row->weeknumber;
                    
                }
                
                // removendo a virgula 
                $text_label = substr($text_label, 0, -1);
                $text_label.=']';
                // percorrendo os valores
                // dd($text_label);
                // dd($valor_titulo);
                
                
                foreach ($valor_titulo as $titulo => $valores) {
                    // percorrendo as datas 
                    
                    foreach ($labels as $data) {
                        if(!array_key_exists($data, $valor_titulo[$titulo])){
                            $valor_titulo[$titulo][$data] = 'null';
                        }                   
                    }
                    ksort($valor_titulo[$titulo]);
                }
                
                $text_datasets='';
                $request_hidden = json_decode($request->input('hidden_response'));
                // montando json
                
                foreach ($valor_titulo as $titulo => $valores) {                     
                    $text_datasets.='{';
                    $text_datasets.='"label": "'.$titulo.'",';         
                    // filtro dos itens desabilitados 
                    // dd(is_object($request_hidden));
                    if(is_object($request_hidden)){
                        if(array_key_exists($titulo, $request_hidden)){
                            // dd(array_key_exists($titulo, $request_hidden));
                            if($request_hidden->$titulo == true ){
                                
                                $text_datasets.='"hidden": true,';
                            }
                        }
                    }           
                    $text_datasets.='"backgroundColor" : "'.$valores['back_color'].'",';
                    $text_datasets.='"borderColor" : "'.$valores['border_color'].'",';
                    $text_datasets.='"data" : [';
                    
                    foreach ($valores as $valor_key => $valor) {
                        if(($valor_key != 'back_color') && ($valor_key!= 'border_color')){
                            $text_datasets.=$valor.',';
                        }
                    }
                    $text_datasets = substr($text_datasets, 0, -1);
                    $text_datasets.=']},';                
                }
                // removendo a virgula 
                $text_datasets = substr($text_datasets, 0, -1);
                $return_json = '{"labels": '.$text_label.', "datasets": ['.$text_datasets.']}';
                // dd($return_json);
                return $return_json; 
            }else{
                $return_json = '{ "datasets": null }';
                return $return_json;                        
            }
            
        }

        if($groupRange == 'month'){

            $rows =  DB::select(DB::raw("
            SELECT 
                    titulo_id as titulo_id,
                -- calculate both SUMs, select values for each dependent by what value it matches to
                (SUM(CASE WHEN ativos_extratos.data_import_id = borders.max_id THEN valor_bruto_atual END) -
                SUM(CASE WHEN ativos_extratos.data_import_id = borders.min_id THEN valor_bruto_atual END)) as diff,                    
                    data_imports.data_import AS created_at,
                    month(data_imports.data_import) AS monthnumber,
                    year(data_imports.data_import) AS yearnumber
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
                                    data_import BETWEEN '".$request->input('start_date')."' AND '".$request->input('end_date')."'
                                GROUP BY month(data_import)
                            ) borders ON ativos_extratos.data_import_id IN (borders.min_id, borders.max_id)
                WHERE	
                    user_id = ".Auth::user()->id."
                -- removed subquery and condition were there
                        AND data_imports.data_import BETWEEN '".$request->input('start_date')."' AND '".$request->input('end_date')."'
                GROUP BY titulos.nome_titulo , monthnumber
                ORDER BY data_import ASC , titulos.nome_titulo ASC
            "));            
            
            if(count($rows)> 0){            
                $temp_date = null;
                $text_label = '[';
                foreach ($rows as $key => $row) {                 
                    if($row->monthnumber != $temp_date){                        
                        $labels[] = $row->monthnumber; 
                        $text_label.='"'.$arrayMonth[$row->monthnumber].'",';                                           
                    }
                    
                    $titulosModel = new Titulos();
                    $tituloModel = $titulosModel->find($row->titulo_id);
                    if($row->diff == null){
                        $valor_titulo[$tituloModel->nome()][$row->monthnumber] = 'null';
                    } else {
                        // Adicionando aportes 
                        if($request->input('check_movimento') == 'true' ){

                            $rowProtocolo =  AtivosProtocolo::select(
                                'operacao_id',
                                db::raw('SUM(valor_total) as valor_operacao'))
                                ->where('user_id', Auth::user()->id) 
                                ->where('titulo_id', $row->titulo_id ) 
                                ->where(db::raw('MONTH(liquidacao)'), $row->monthnumber)
                                ->where(db::raw('Year(liquidacao)'), $row->yearnumber)
                                ->groupBy('titulo_id')
                                ->get();
                                // dd($row->monthnumber);
                                if(count($rowProtocolo)> 0){
                                    foreach ($rowProtocolo as $key => $value) {                                        
                                        if(($value->operacao_id) && ($value->valor_operacao)){
                                            // dd($row);
                                            /* 
                                            1 INVESTIMENTO
                                            2 RESGATE
                                            */
                                            if($value->operacao_id == 1){
                                                // var_dump(" Valor: ".$value->valor_operacao);
                                                // var_dump(" Mes: ".$row->monthnumber);
                                                // var_dump(" tituloid: ".$row->titulo_id);
                                                // dd($value->operacao_id);
                                                $row->diff = $row->diff - $value->valor_operacao;
                                            }
                                            elseif($value->operacao_id == 2){
                                                $row->diff = $row->diff + $value->valor_operacao;
                                            }
                                        }                                        
                                    }
                                }

                            // SELECT operacao_id, SUM(valor_total) as valor_total,  ativos_protocolos.* 
                            // FROM moneyguard_database.ativos_protocolos
                            // INNER JOIN
                            //     `titulos` ON `titulo_id` = `titulos`.`id`  
                            // where 
                            // titulo_id = 4 and 
                            // MONTH(liquidacao) = 7
                            // group by titulo_id




                            
                        }
                        $valor_titulo[$tituloModel->nome()][$row->monthnumber] = $row->diff;
                    }


                    if ($tituloModel->back_color == null) {
                        $tituloModel->back_color = 'rgba(0,0,0,0)';
                    }
                    $valor_titulo[$tituloModel->nome()]['border_color'] = $tituloModel->back_color;
                    $valor_titulo[$tituloModel->nome()]['back_color'] = $tituloModel->border_color;

                    $temp_date = $row->monthnumber;
                    
                }
                
                // removendo a virgula 
                $text_label = substr($text_label, 0, -1);
                $text_label.=']';
                // percorrendo os valores
                // dd($text_label);
                // dd($valor_titulo);
                
                
                foreach ($valor_titulo as $titulo => $valores) {
                    // percorrendo as datas 
                    
                    foreach ($labels as $data) {
                        if(!array_key_exists($data, $valor_titulo[$titulo])){
                            $valor_titulo[$titulo][$data] = 'null';
                        }                   
                    }
                    ksort($valor_titulo[$titulo]);
                }
                
                $text_datasets='';
                $request_hidden = json_decode($request->input('hidden_response'));
                // montando json
                
                foreach ($valor_titulo as $titulo => $valores) {                     
                    $text_datasets.='{';
                    $text_datasets.='"label": "'.$titulo.'",';         
                    // filtro dos itens desabilitados 
                    // dd(is_object($request_hidden));
                    if(is_object($request_hidden)){
                        if(array_key_exists($titulo, $request_hidden)){
                            // dd(array_key_exists($titulo, $request_hidden));
                            if($request_hidden->$titulo == true ){
                                
                                $text_datasets.='"hidden": true,';
                            }
                        }
                    }           
                    $text_datasets.='"backgroundColor" : "'.$valores['back_color'].'",';
                    $text_datasets.='"borderColor" : "'.$valores['border_color'].'",';
                    $text_datasets.='"data" : [';
                    
                    foreach ($valores as $valor_key => $valor) {
                        if(($valor_key != 'back_color') && ($valor_key!= 'border_color')){
                            $text_datasets.=$valor.',';
                        }
                    }
                    $text_datasets = substr($text_datasets, 0, -1);
                    $text_datasets.=']},';                
                }
                // removendo a virgula 
                $text_datasets = substr($text_datasets, 0, -1);
                $return_json = '{"labels": '.$text_label.', "datasets": ['.$text_datasets.']}';
                // dd($return_json);
                return $return_json; 
            }else{
                $return_json = '{ "datasets": null }';
                return $return_json;                        
            }
            
        }

            
    }

    /**
     * Retorna os valores dos Rendimento separdos por corretora.
     *
     * @return string
     */
    public function homeChartRendimentoCorretora() {
        // o parametro define o setor o qual pertence o campo. 
        // $array_representante = Auth::User()->dashboard(1);

        // $extrato = AtivosExtrato::select(
        //     DB::raw(" sum(valor_liquido_atual) as valor"),
        //     'data_imports.data_import as created_at'            
        //     )
        //     ->where('representante_id', '1')
        //     ->join('data_imports','data_import_id', '=', 'data_imports.id' )
        //     ->groupBy('data_import_id')
        //     ->take(15)
        //     ->get();
        
        // dd($extrato);

        $dados = [
            'corretora' => 'vérios',
            'valor' => '1.124,99',
            'rendimento' => '-10',
            'url' => 'home',
            'chartdata' => [

                'labels' => [
                    4,5,6,9,10, 12, 13,13,14
                ],
                'datasets' => [                   
                    [
                        'data' => [
                            4764.86, 4763.48, 4764.63, 4762.50, 4761.79, 4753.74, 4747.48, 4750.13, 4746.47,
                            ]
                    ]
                ]
                
            ]
        ] ;

        
        $return[] = $dados;
              
        return response()->json($return);


    }
}
