/**
 * Archivo encargado gestionar la conexion y procesos dedicados a la base de datos (sqlite) que usa la aplicación internamente
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @company: Mundocomputo Armenia <contacto@mundocomputo.com>
 * @version: 1.0
 */
// Declaracion de variables globales
var db = null;


function conexionDB(){
	 db = window.openDatabase('petrolabs.db', '1.0', '', 1);
}



function tablasInicialesDB(){ 
  // En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
  
  // ========== TABLA PARA MANTENER EL USUARIO LOGUEADO ========== //
   // db.transaction(function (tx) {
   //    tx.executeSql('DROP TABLE usuario');
   //  });
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (id_usuario, ciudad, rol, cedula, nombre, apellidos, telefono, email, clave, estado, id_rol, nombre_rol, id_ciudad, departamento, nombre_ciudad, id_islero, usuario, estacion, tipo_incentivo, rut, token, id_estacion, nombre_estaciones)');
  }, function(error) {
      myApp.hidePreloader();
      myApp.alert('Ha ocurrido un error en la base de datos', 'Error');
      console.log('Transaction ERROR: ' + error.message);
  }, function() {
     // myApp.alert('Tablas creadas', 'Sucess');
  }); 
}