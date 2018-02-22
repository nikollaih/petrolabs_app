var config = {base_url: '', url_services : 'http://192.168.1.18/petrolabs/'};
var user = [];
var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var fecha_comisiones = "";
var productos_comisiones = [];

$$(document).on('click', '#login-button', function(){
	myApp.showPreloader('Validando datos');
	login();
})

$$(document).on('click', '#cerrar-session-btn', function(){
	logOut();
})

$$(document).on('click', '#registrar-venta-btn', function (e) {
	myApp.showPreloader();
	registrarVenta();
});

$$(document).on('click', '.slt-incentivo', function (e) {
	seleccionarIncentivo(this);
});

$$(document).on('click', '.slt-comision-anio', function (e) {
	var vAnio = $$(this).attr('data-anio');
	var vMes = $$(this).attr('data-mes');

	productosComisiones(vAnio, vMes);
});

$$(document).on('click', '.item-comision', function (e) {
	if (!$$(this).hasClass('active')) {
		$('.item-comision').removeClass('active');
		$(this).addClass('active');
		$('.subnivel-comision').slideUp();
		$(this).next().slideDown();
	}
	else{
		$('.item-comision').removeClass('active');
		$(this).next().slideUp();
	}
});


function generarFechasComisiones(anio){
	var date = new Date();
	var mm = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear();

	var lista_DOM = "";
	for (var i = anio; i <= yyyy; i++) {
		lista_DOM += '<li>' +
		                 '<a href="#" class="item-link item-content item-comision">' +
		                    '<div class="item-inner">' +
		                      '<div class="item-title">'+i+'</div>' +
		                      '<div class="item-after">Abrir</div>' +
		                    '</div>' +
		                  '</a>' +
		                  '<div class="subnivel-comision list">' +
                    		'<ul style="padding-left: 25px;">';
		for (var m = 0; m < (meses.length); m++) {
			lista_DOM += '<li class="slt-comision-anio" data-anio="'+i+'" data-mes="'+ (parseInt(m)+1) +'">' +
                        '<a href="#" class="item-link item-content">' +
                          '<div class="item-inner">' +
                            '<div class="item-title">'+meses[m]+'</div>' +
                            '<div class="item-after">Ver</div>' +
                          '</div>' +
                        '</a>' +
                      '</li>';
            if (i == yyyy && m == mm - 1) {
            	m = meses.length;
            }
		}

		lista_DOM += 		'</ul>' + 
						'</div>' +
					'</li>';

	}

	$$('#lista-comisiones-productos').html(lista_DOM);
}

function fechaActual(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	today = yyyy + '-' + mm + '-' + dd;
	return today;
}