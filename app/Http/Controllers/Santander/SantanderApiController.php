<?php

namespace App\Http\Controllers\Santander;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SantanderExtrato;
use Auth;

class SantanderApiController extends Controller
{
    //
    public function homeGraphicsRemdimento (Request $request){        
        $rows =  SantanderExtrato::OrderBy('data', 'ASC')
                ->where('user_id', Auth::user()->id) 
                ->whereBetween('data', [$request->input('start_date'), $request->input('end_date')])                
                ->groupBy('data')
                ->groupBy('historico')
                ->get();
        
        // dd($rows);
        if($rows->count() > 0){
            $text_label = '[';
            $temp_date = null;
            foreach ($rows as $row) {

                if($row->data != $temp_date){
                    $labels[] = $row->data;  
                    $text_label.='"'.$row->data->format('d/m/Y').'",';
                }

                if($row->historico == "JUROS"){
                    $valor_titulo[$row->historico][$row->data->format('Y-m-d')] = $row->saldo;
                } else {
                    $valor_titulo[$row->historico][$row->data->format('Y-m-d')] = $row->valor_movimento;
                }               

                $temp_date = $row->data;
            }
            // removendo a virgula 
            $text_label = substr($text_label, 0, -1);            
            $text_label.=']';
            $text_datasets='';

            // tratando valores adicionais 
            foreach ($valor_titulo as $item => $valores){
                if($item != "JUROS"){
                    foreach ($valor_titulo['JUROS'] as $data => $value) {
                        if($data != isset($valor_titulo[$item][$data])){
                            $valor_titulo[$item][$data] = 'null';
                        }
                    }
                    ksort($valor_titulo[$item]);
                }
            }
            

            $request_hidden = json_decode($request->input('hidden_response'));
            // dd($valor_titulo);
            foreach ($valor_titulo as $movimentacao => $valores) { 
                $text_datasets.='{';
                $text_datasets.='"label": "'.$movimentacao.'",';   
                // filtro dos itens desabilitados 
                // dd(is_object($request_hidden));
                if(is_object($request_hidden)){
                    if(array_key_exists($movimentacao, $request_hidden)){
                        // dd(array_key_exists($movimentacao, $request_hidden));
                        if($request_hidden->$movimentacao == true ){
                            
                            $text_datasets.='"hidden": true,';
                        }
                    }
                }
                if($movimentacao != 'JUROS'){
                    $text_datasets.='"backgroundColor" : "rgba(39,6,252,0.99)",';
                    $text_datasets.='"borderColor" : "rgba(9,6,252,0.99)",';
                    $text_datasets.='"radius" : "9",';
                    $text_datasets.='"pointStyle" : "rectRot",';
                }else{
                    $text_datasets.='"backgroundColor" : "rgba(234,3,3,0.39)",';
                    $text_datasets.='"borderColor" : "rgba(234,3,3,0.92)",';
                }
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
            return response($return_json); 
        }else{
            $return_json = '{ "datasets": null }';
            return response($return_json);                
        }
    }
}
