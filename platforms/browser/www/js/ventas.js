$$(document).on('click', '.to-sell', function (e) {
    myApp.prompt('Cantidad', 'Registrar Venta: ' + $$(this).attr('data-nombre'));
});