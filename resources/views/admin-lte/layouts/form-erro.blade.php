@if ($errors->any())
<div class="alert callout callout-danger">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <h5><i class="icon fas fa-ban"></i> Ocorreram alguns erros: </h5>
      @foreach ($errors->all() as $error)
        <p><i class="fas fa-arrow-right"></i> {{ $error }}</p>                       
      @endforeach
</div>
@endif