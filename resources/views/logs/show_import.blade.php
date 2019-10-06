@extends('gentelella.layouts.app')

@section('htmlheader_title', 'Detalhe Log de Importação')


{{--  Page title  --}}

@section('page_title', 'Detalhe Log de Importação')

{{--  Page Content  --}}
@section('content')
<div class="col-md-6 col-sm-6 col-xs-12">
  <div class="form-group">
    <label class="control-label col-md-3 col-sm-3 col-xs-12">Usuário </label>
      <div class="col-md-9 col-sm-9 col-xs-12">
      <input class="form-control" disabled="disabled" value="{{$log->user->name}}" type="text">
  </div>
</div>
</div>
<div class="col-md-6 col-sm-6 col-xs-12">
    <div class="form-group">
      <label class="control-label col-md-5 col-sm-5 col-xs-12">Data de Importação </label>
        <div class="col-md-7 col-sm-7 col-xs-12">
        <input class="form-control" disabled="disabled" value="{{$log->created_at->format('d/m/Y')}}" type="text">
    </div>
  </div>
</div>
<div class="row"></div>
<br>
<div class="col-md-6 col-sm-6 col-xs-12">
    <div class="form-group">
      <label class="control-label col-md-3 col-sm-3 col-xs-12">Tipo Importção </label>
        <div class="col-md-9 col-sm-9 col-xs-12">
        <input class="form-control" disabled="disabled" value="{{$log->categoria_importacao}}" type="text">
    </div>
  </div>
  </div>
<div class="col-md-6 col-sm-6 col-xs-12">
  <span class="label label-danger pull-right">{{$log->tipo_erro}}</span>
</div>  
<br>
<div class="row"></div>
<br>
<div class="col-md-12 col-sm-12 col-xs-12">
<div class="form-group">
    <label class="control-label col-md-12 col-sm-12 col-xs-12">LOG </label>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <pre>{{$log->log}}</pre>
  </div>
</div>
</div>
 <!-- Trigger the Modal -->
 <div class="col-md-12 col-sm-12 col-xs-12"> 
    <div class="form-group">   
      @if (Storage::exists('/public/erro_log/'.$log->id.'.png'))
      <label class="control-label col-md-12 col-sm-12 col-xs-12">IMG LOG </label>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <img id="myImg" src="{{Storage::url('/erro_log/'.$log->id.'.png')}}" alt="{{$log->categoria_importacao}}" style="width:100%;max-width:300px">
          <div id="myModal" class="modal">
            <span class="close">&times;</span>
            <img class="modal-content" id="img01">
            <div id="caption"></div>
          </div>
        </div>
          
      @endif
    </div>
 </div>

@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
<script>
  // Get the modal
  var modal = document.getElementById('myModal');
  
  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var img = document.getElementById('myImg');
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() { 
    modal.style.display = "none";
  }
  </script>   
  <style>
      body {font-family: Arial, Helvetica, sans-serif;}
      
      #myImg {
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s;
      }
      
      #myImg:hover {opacity: 0.7;}
      
      /* The Modal (background) */
      .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
      }
      
      /* Modal Content (image) */
      .modal-content {
        margin: auto;
        display: block;
        width: 80%;
        max-width: 1000px;
      }
      
      /* Caption of Modal Image */
      #caption {
        margin: auto;
        display: block;
        width: 80%;
        max-width: 700px;
        text-align: center;
        color: #ccc;
        padding: 10px 0;
        height: 150px;
      }
      
      /* Add Animation */
      .modal-content, #caption {  
        -webkit-animation-name: zoom;
        -webkit-animation-duration: 0.6s;
        animation-name: zoom;
        animation-duration: 0.6s;
      }
      
      @-webkit-keyframes zoom {
        from {-webkit-transform:scale(0)} 
        to {-webkit-transform:scale(1)}
      }
      
      @keyframes zoom {
        from {transform:scale(0)} 
        to {transform:scale(1)}
      }
      
      /* The Close Button */
      .close {
        position: absolute;
        top: 15px;
        right: 35px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        transition: 0.3s;
      }
      
      .close:hover,
      .close:focus {
        color: #bbb;
        text-decoration: none;
        cursor: pointer;
      }
      
      /* 100% Image Width on Smaller Screens */
      @media only screen and (max-width: 700px){
        .modal-content {
          width: 100%;
        }
      }
  </style>


@endsection