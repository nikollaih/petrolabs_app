/**
 * Obtiene la lista de productos mediante una peticion ajax
 * @author Nikollai Hernandez G <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
function obtenerProductos(){
	$$.ajax({
		method: 'post',
        url: config['url_services'] + "producto/listarProductosApp",
        data:{
        	token: user['token'],
        	id_usuario: user['id_usuario']
        },
        success: function (response) {
            var objResponse = eval(JSON.parse(response));

            if (objResponse['estado'] == true) {
            	cargarProductos(objResponse['objeto']);
            }
            else{
            	$$('#lista-productos').html('<h3 class="mensaje-lista">Acceso denegado, vuelve a iniciar sesion</h3>');
            }
        },
        error: function (e) {
            console.log(e);
            myApp.hidePreloader();
        }
    });
}

/**
 * Crea el DOM para la lista de productos de la app
 * @author Nikollai Hernandez G <nikollaihernandez@gmail.com>
 * @param  {[obj]} productos Recibe un arreglo con la lista de productos
 * @return {[type]}           [description]
 */
function cargarProductos(productos){
	var productos_DOM = "";
   
	for (var i = 0; i < productos.length; i++) {
		var producto = productos[i];

		productos_DOM +=    '<li>' +
						      '<div class="item-content">' +
						        '<div class="item-media">' +
						          '<img id="img-item-'+producto['id_producto']+'" class="round-img" width="60" src="'+producto['foto']+'">' +
						        '</div>' +
						        '<div class="item-inner">' +
						          '<div class="item-title-row">' +
						            '<div class="item-title">'+producto['nombre_producto']+'</div>' +
						            '<div style="margin-left: 0;" class="item-after">$'+producto['precio']+' - Com. '+producto['comision']+'</div>' +
						          '</div>' +
						          '<i data-nombre="'+producto['nombre_producto']+'" data-id="'+producto['id_producto']+'" style="font-size: 1.5em;color: #003e43;" class="fa fa-plus to-sell"></i>' +
						        '</div>' +
						      '</div>' +
						    '</li>';
	}

	$$('#lista-productos').html(productos_DOM);
}

/**
 * Obtiene un ponderado de los productos vendidos en un mes con el total de comision generada
 * @author Nikollai Hernandez G <nikollaihernandez@gmail.com>
 * @param  {[int]} anio Recibe el año del cual se desean consultar los productos vendidos
 * @param  {[int]} mes  Recibe el mes del cual se desean consultar los productos vendidos 
 * @return {[type]}      [description]
 */
function productosComisiones(anio, mes){
	$$.ajax({
		method: 'post',
        url: config['url_services'] + "producto/comisionesIsleroMes",
        data:{
        	mes: mes,
        	anio: anio,
        	islero: user['id_islero'], 
        	token: user['token'],
        	id_usuario: user['id_usuario']
        },
        success: function (response) {
        	fecha_comisiones = meses[mes - 1] + ' de ' + anio;
        	productos_comisiones = eval(JSON.parse(response))['objeto'];
            mainView.router.loadPage('comisiones_productos.html');
        },
        error: function (e) {
            console.log(e); 
            myApp.hidePreloader();
        }
    });
}

function cargarProductosComisiones(productos){
	myApp.showPreloader();
	var productos_DOM = "";

	if (productos.length > 0) {
		var total_comision = 0;
		for (var i = 0; i < productos.length; i++) {
			var producto = productos[i]; 
			total_comision += parseFloat(producto['comision_total']);
			productos_DOM += '<li>' +
						      '<div class="item-content">' +
						        '<div class="item-media">' +
						          '<img class="round-img" width="60" src="'+producto['foto']+'">' +
						        '</div>' +
						        '<div class="item-inner">' +
						          '<div class="item-title-row">' +
						            '<div class="item-title">'+producto['nombre_producto']+'</div>' +
						            '<div style="margin-left: 0;" class="item-after">Vendidos: '+producto['cantidad']+'</div>' +
						            '<div style="margin-left: 0;" class="item-after">Comision: $'+producto['comision_total']+' COP</div>' +
						          '</div>' +
						        '</div>' +
						      '</div>'+
						    '</li>';
		}

		$$('#total-comisiones-mes').html('$' + total_comision + ' COP');
	}
	else{
		productos_DOM = '<h3 class="mensaje-lista">No se han encontrado productos para la fecha</h3>';
	}

	$$('#lista-productos').html(productos_DOM);
	myApp.hidePreloader();
}
