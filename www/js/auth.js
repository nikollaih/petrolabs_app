function login(){
	var email = $$('#email-login').val();
	var pass = $$('#pass-login').val();

	if (email.trim().length > 0 && pass.trim().length > 0) {
		$$.ajax({
			method: 'post',
	        url: config['url_services'] + "auth/login",
	        data:{
	        	correo: email,
	        	clave: pass
	        },
	        success: function (response) {
	            user_temp = eval(JSON.parse(response));
	            // Se ingresa en la tabla usuario el nuevo usuario logueado
		        db.transaction(function(tx) {
		            tx.executeSql('INSERT INTO usuario VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [user_temp['id_usuario'], user_temp['ciudad'], user_temp['rol'], user_temp['cedula'], user_temp['nombre'], user_temp['apellidos'], user_temp['telefono'], user_temp['email'], user_temp['clave'], user_temp['estado'], user_temp['id_rol'], user_temp['nombre_rol'], user_temp['id_ciudad'], user_temp['departamento'], user_temp['nombre_ciudad'], user_temp['id_islero'], user_temp['usuario'], user_temp['estacion'], user_temp['tipo_incentivo'], user_temp['rut'], user_temp['token'], user_temp['id_estacion'], user_temp['nombre_estaciones']]);
		        }, function(error) {
		            myApp.alert('Ha ocurrido un error, por favor intente de nuevo más tarde', 'Error!');
		        }, function() {
		            usuarioConectado();
		            setTimeout(function(){mainView.router.loadPage('dashboard.html');}, 300);
		            myApp.hidePreloader();
		            return true;
		        }); 
	        },
	        error: function (e) {
	            console.log(e);
	            myApp.hidePreloader();
	        }
	    });
	}
	else{
		myApp.alert("Por favor complete todos los campos", "Error");
	}
}


// Función que valida que exista una cuenta de usuario ya registrada
// @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
function usuarioConectado(){
    // Se consulta los datos existentes en la tabla usuario
    db.transaction(function (txn) {
        txn.executeSql('SELECT * FROM  usuario', [], function (tx, res) {
            if (res.rows.length > 0) {
                user = res.rows.item(0);
            } 
        });
    });
}

// Está función es la encargada de de cerrar la session actual de la app
// @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
function logOut(){ 
    myApp.confirm('¿Continuar?', 'Cerrar Sesion', function (value) {
        // En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
        db.transaction(function(tx) {
            tx.executeSql('DELETE FROM usuario');
        }, function(error) {
            return false;
        }, function() {
            user = [];
            mainView.router.loadPage('login.html'); 
        });
    });
}