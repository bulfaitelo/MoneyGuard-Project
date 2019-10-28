<script>
    @if(session('success'))
        toastr.success('{{ session('success') }}')
    @elseif(session('info'))
        toastr.success('{{ session('info') }}')
    @elseif(session('warning'))     
        toastr.success('{{ session('warning') }}')
    @elseif(session('error'))
        toastr.success('{{ session('error') }}')
    @elseif($errors->any())     
        toastr.error('Ocorreram alguns erros por faor verifique o formulário.')
    @endif        
</script>

    