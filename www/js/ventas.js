$$(document).on('click', '.to-sell', function (e) {
	$$('#fecha-venta').val(fechaActual());
	$$('#producto-popup-venta').html($$(this).attr('data-nombre'));
	$$('#producto-venta').val($$(this).attr('data-id'));
	$$('#img-sell').attr('src', $$('#img-item-' + $$(this).attr('data-id')).attr('src'));
	myApp.popup('.popup-venta', true, true);
}); 


function registrarVenta(){
	var vCantidad = $$('#cantidad-venta').val();
	var vFecha = $$('#fecha-venta').val();
	var vProducto = $$('#producto-venta').val();

	if (vCantidad > 0 && vCantidad.trim().length > 0 && vFecha.trim().length > 0) {
		$$.ajax({
			method: 'post',
	        url: config['url_services'] + "venta/agregar",
	        data:{
	        	cantidad: vCantidad,
	        	fecha: vFecha,
	        	islero: user['id_islero'],
	        	producto: vProducto,
	        	token: user['token'],
	        	id_usuario: user['id_usuario']
	        },
	        success: function (response) {
	        	var objRespuesta = eval(JSON.parse(response));

	        	if (objRespuesta['estado'] == true) {
	        		myApp.alert(objRespuesta['mensaje'], 'Exito!');
	        		myApp.closeModal('.popup-venta');
	        		$$('#fecha-venta').val(fechaActual());
	        		$$('#cantidad-venta').val(1);
	        	}
	        	else{
	        		myApp.alert(objRespuesta['mensaje'], 'Error!');
	        	}
	            myApp.hidePreloader();
	        },
	        error: function (e) {
	        	myApp.alert('Ha ocurrido un error', 'Error');
	            myApp.hidePreloader();
	        }
	    });
	}
	else{
		myApp.hidePreloader();
		myApp.alert("Por favor complete todos los campos", "Error");
	}
}


function obtenerIncentivos(){
	$$.ajax({
		method: 'post',
        url: config['url_services'] + "incentivo/obtenerIncentivosApp",
        data:{
        	token : user['token'],
        	id_usuario : user['id_usuario']
        },
        success: function (response) {
            var objIncentivos = eval(JSON.parse(response));

            if (objIncentivos['estado'] == true) {
            	var incentivos = objIncentivos['objeto'];
            	cargarIncentivos(incentivos);
            }
            else{
            	$$('#lista-incentivos').html('<h3 class="mensaje-lista">Acceso denegado, vuelve a iniciar sesion</h3>');
            }
        },
        error: function (e) {
            console.log(e); 
            myApp.hidePreloader();
        }
    });
}

function cargarIncentivos(incentivos){
	var incventivos_DOM = "";
	if (incentivos.length > 0) {
		for (var i = 0; i < incentivos.length; i++) {
			var incentivo = incentivos[i];
			if (incentivo['id_tipo'] == user['tipo_incentivo']) {
				var seleccionar = "active";
			}
			else{
				var seleccionar = "";
			}

			incventivos_DOM += '<li>' +
				                  '<a href="#" class="item-link item-content">' +
				                    '<div class="item-inner">' +
				                      '<div class="item-title">'+incentivo['descripcion']+'</div>' +
				                      '<div data-id="'+incentivo['id_tipo']+'" data-nombre="'+incentivo['descripcion']+'" class="item-after slt-incentivo '+seleccionar+'"><i class="fa fa-check"></i></div>' +
				                    '</div>' +
				                  '</a>' +
				                '</li>';
		}
	}

	$$('#lista-incentivos').html(incventivos_DOM);
}

function seleccionarIncentivo(e){
	if ($$(e).attr('data-id') != user['tipo_incentivo']) {
		myApp.confirm('¿Está seguro que desea cambiar su tipo de incentivo a ' + $$(e).attr('data-nombre') + '?', 'Tipo de incentivo', function(value){
			$$.ajax({
				method: 'post',
		        url: config['url_services'] + "incentivo/actualizarIncentivoIsleroApp",
		        data:{
		        	incentivo : $$(e).attr('data-id'),
		        	token : user['token'], 
		        	id_usuario : user['id_usuario']
		        },
		        success: function (response) {
		        	objRespuesta = eval(JSON.parse(response));

		        	if (objRespuesta['estado'] == true) {
		        		db.transaction(function(tx) {
						    tx.executeSql('UPDATE usuario SET tipo_incentivo = ?', [$$(e).attr('data-id')]);
						}, function(error) {
							myApp.alert('Ha ocurrido un error, por favor intente de nuevo más tarde', 'Error!');
						}, function() {
						    usuarioConectado();
						    $$('.slt-incentivo').removeClass('active');
							$$(e).addClass('active');
						}); 
		        	}
					else{
						myApp.alert(objRespuesta['mensaje'], 'Error');
					}
		        },
		        error: function (e) {
		            console.log(e);
		        }
		    });
		})
	}
}