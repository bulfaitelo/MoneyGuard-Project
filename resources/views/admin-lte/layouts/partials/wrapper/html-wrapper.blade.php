  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>@yield('page_title')</h1>
              </div>
              {{-- breadcrumb --}}
              @include('admin-lte.layouts.partials.wrapper.html-breadcrumb')
              {{-- /breadcrumb --}}
              
            </div>
          </div><!-- /.container-fluid -->
        </section>
    
        <!-- Main content -->
        <section class="content" id="app">
            @yield('content')
         
    
        </section>
        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->