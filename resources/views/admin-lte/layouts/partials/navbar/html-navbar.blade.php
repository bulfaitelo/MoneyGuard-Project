
<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    {{-- Left navbar links --}}
    @include('admin-lte.layouts.partials.navbar.html-left-nav')
    {{-- /Left navbar links --}} 

    {{-- SEARCH FORM --}}
    @include('admin-lte.layouts.partials.navbar.html-search')
    {{-- /SEARCH FORM --}}
    
    {{-- right navbar links --}}
    @include('admin-lte.layouts.partials.navbar.html-right-nav')
    {{-- /right navbar links --}}    
</nav>
