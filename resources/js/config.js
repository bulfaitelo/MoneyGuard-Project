// jQuery Mask
$('.money_mask').mask('000.000.000.000.000,00', {reverse: true});
$('.money_mask2').mask("#.##0,00", {reverse: true});
$('.number').mask("00000000000", {reverse: true});

$(function() {
    // Setup drop down menu
    $('.dropdown-toggle').dropdown();
  
    // Fix input element click problem
    $('.dropdown input, .dropdown label, .dropdown select').click(function(e) {
      e.stopPropagation();
    });
  
    $('.dropdown-menu').find('form').click(function (e) {
        e.stopPropagation();
    });
  });


// Data TAble
// Tabela full sem filtro
$(document).ready( function () {
  var table = $('#data_tables_simple_full').DataTable({
    paging: false,
    searching: true,
    dom: 't',
    language :{
      "sEmptyTable": "Nenhum registro encontrado",
      "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
      "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
      "sInfoFiltered": "(Filtrados de _MAX_ registros)",
      "sInfoPostFix": "",
      "sInfoThousands": ".",
      "sLengthMenu": "_MENU_ resultados por página",
      "sLoadingRecords": "Carregando...",
      "sProcessing": "Processando...",
      "sZeroRecords": "Nenhum registro encontrado",
      "sSearch": "Pesquisar",
      "oPaginate": {
          "sNext": "Próximo",
          "sPrevious": "Anterior",
          "sFirst": "Primeiro",
          "sLast": "Último"
      },
      "oAria": {
          "sSortAscending": ": Ordenar colunas de forma ascendente",
          "sSortDescending": ": Ordenar colunas de forma descendente"
      }
  }
  });
  // #myInput is a <input type="text"> element
  $('#default_search_input').on( 'keyup', function () {
      table.search( this.value ).draw();
  } );
});
