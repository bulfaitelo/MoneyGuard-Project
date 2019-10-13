  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="{{ route('home')}}" class="brand-link">
          <img src="/imgs/moneyguard_logo.png"
               alt="AdminLTE Logo"
               class="brand-image img-circle elevation-3"
               style="opacity: .8">
          <span class="brand-text font-weight-light">MoneyGuard</span>
        </a>
    
        <!-- Sidebar -->
        <div class="sidebar">
          {{-- Sidebar user (optional) --}}
          @include('admin-lte.layouts.partials.sidebar.html-sidebar-gravatar')
          {{-- /Sidebar user (optional) --}}         
    
          {{-- Sidebar Menu --}}
          @include('admin-lte.layouts.partials.sidebar.html-sidebar-menu')
          {{-- /Sidebar Menu --}}
        </div>
        <!-- /.sidebar -->
      </aside>