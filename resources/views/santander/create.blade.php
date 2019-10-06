@extends('gentelella.layouts.app')

@section('htmlheader_title', 'Importação Santander')


{{--  Page title  --}}
@section('page_title', 'Importação Santander')

{{--  Page Content  --}}
@section('content')

            
<div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="x_panel">
            <div class="x_title">
              <h2>Selecione o arquivo </h2>              
              <div class="clearfix"></div>
            </div>
            <div class="x_content">
            <br>            
            {!! Form::open(['action'=> 'Santander\SantanderController@store', 'files' => true, 'class'=> 'form-horizontal form-label-left']) !!}
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">First Name <span class="required">*</span>
                  </label>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <input id="first-name" required="required" class="form-control col-md-7 col-xs-12" type="file">
                  </div>
                </div>     
                <div class="ln_solid"></div>
                <div class="form-group">
                  <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">                    
                    <button type="submit" class="btn btn-success">Submit</button>
                  </div>
                </div>

            {!! Form::close() !!}
            </div>
          </div>
        </div>
      </div>

@endsection

{{--  Optional script Blades  --}}
@section('script_blade')
    
@endsection