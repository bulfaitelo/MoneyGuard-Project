<?php

namespace App\Http\Controllers\Ativos;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Ativos\AtivosPrecosTaxas;
use App\Models\Parametros\Titulos;

class AtivosApiController extends Controller
{
    //

    
    public function homeGraphicsPreco (Request $request, AtivosPrecosTaxas $ativosPecosTaxas){  
        $titulo_id = $request->input('titulo_id');
        $rows = $ativosPecosTaxas->orderBy('created_at', 'ASC')
            ->whereBetween('created_at', [$request->input('start_date'), $request->input('end_date')])                
            ->where('titulo_id', $titulo_id)
            ->get();       
        $titulo = Titulos::find($titulo_id);
        // dd($rows);
        if($rows->count() > 0){
            $base = '
                
                "backgroundColor": "'.$titulo->border_color.'",
                "borderColor": "'.$titulo->back_color.'",
                "data":
            ';
            $text_label = '[';        
            $taxa_label = '
                "label": "Taxa de Rendimento (% a.a.)",
                '.$base.'   
            [';        
            $preco_label = '
                "label": "Preço Unitário",
                "hidden": true,
                '.$base.'   
            [';        
            $min_valor_label = '
                "label": "Valor Mínimo",
                "hidden": true,
                '.$base.'   
            [';        
            foreach ($rows as $row) {                
                $text_label.='"'.$row->created_at->format('d/m/Y').'",';  
                $taxa_label.='"'.$row->taxa_rendimento.'",';  
                $min_valor_label.='"'.$row->valor_minimo.'",';  
                $preco_label.='"'.$row->preco_unitario.'",';  
            }
            // removendo a virgula 
            $text_label = substr($text_label, 0, -1);            
            $taxa_label = substr($taxa_label, 0, -1);            
            $min_valor_label = substr($min_valor_label, 0, -1);            
            $preco_label = substr($preco_label, 0, -1);

            $text_label.=']';
            $taxa_label.=']';
            $min_valor_label.=']';
            $preco_label.=']';  
            
            $return_json ='{ "labels": '.$text_label.',';
            $return_json.='"datasets": [{ '.$taxa_label.'}, ';
            $return_json.='{ '.$min_valor_label.'}, ';
            $return_json.='{ '.$preco_label.'}]} ';
            return $return_json;  
        }else{
            $return_json = '{ "datasets": null }';
            return $return_json;                        
        }        
    }
}