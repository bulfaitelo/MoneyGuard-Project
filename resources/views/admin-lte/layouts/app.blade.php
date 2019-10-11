<!DOCTYPE html>
<html>
  {{-- HTML HEAD --}}
@include('admin-lte.layouts.partials.html-head')
  {{-- /HTML HEAD --}}
<body class="hold-transition sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">
{{-- NAVBAR --}}
@include('admin-lte.layouts.partials.navbar.html-navbar')
{{-- /NAVBAR --}}

{{-- SIDEBAR --}}
@include('admin-lte.layouts.partials.sidebar.html-sidebar')
{{-- /SIDEBAR --}}

{{-- CONTENT WARPPER --}}
@include('admin-lte.layouts.partials.wrapper.html-wrapper')
{{-- /CONTENT WARPPER --}}



{{-- FOOTER --}}
@include('admin-lte.layouts.partials.html-footer')
{{-- /FOOTER --}}

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->    
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

{{-- SCRIPTS --}}
@include('admin-lte.layouts.partials.html-scripts')  
{{-- /SCRIPTS --}}

</body>
</html>
