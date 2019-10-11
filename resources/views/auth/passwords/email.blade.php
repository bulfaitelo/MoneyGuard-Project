<!DOCTYPE html>
<html>
{{-- HTML HEAD --}}
@section('htmlheader_title', 'Password resset')
@include('admin-lte.layouts.partials.html-head')
{{-- /HTML HEAD --}}
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <b>MoneyGuard</b>
  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Reset Passwordn</p>

      <form method="POST" action="{{ route('password.email') }}">
          @csrf

    

    <div class="input-group mb-3">
        <input id="email" type="email" placeholder="E-mail" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>

        @if ($errors->has('email'))
            <span class="invalid-feedback">
                <strong>{{ $errors->first('email') }}</strong>
            </span>
        @endif
        <div class="input-group-append">
          <div class="input-group-text">
            <span class="fas fa-envelope"></span>
          </div>
        </div>
      </div>        
      <div class="row">
        
        <!-- /.col -->
        <div class="col-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Send</button>
        </div>
        <!-- /.col -->
      </div>
  </form>
  <p class="mb-0 mt-3">
      <a href="{{ route('login') }}">Back to Login</a>
    </p>

      
    <!-- /.login-card-body -->
  </div>
</div>
<!-- /.login-box -->

{{-- SCRIPTS --}}
@include('admin-lte.layouts.partials.html-scripts')  
{{-- /SCRIPTS --}}

</body>
</html>
