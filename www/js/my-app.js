// Initialize app
var myApp = new Framework7({
    material: true //enable Material theme
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    conexionDB();
    tablasInicialesDB();
    usuarioConectado();

     //Despues de tres segundos de iniciar la aplicacion se carga la vista de login y se muestran las barras de navbar y toolbar
    setTimeout(function(){
        // En caso de que ya exista un usuario logueado la aplicacion se dirigirá a la lista de productos
        if (user['id_usuario']) {
            mainView.router.loadPage('dashboard.html');
        }
        // En caso de que no exista un usuario logueado se mostrará la pantalla de login
        else{
            mainView.router.loadPage('login.html');
        }

        $$('.navbar').show();
        $$('.toolbar').show();
        }, 3000);
});


// Now we need to run the code that will be executed only for About page.

//We can also add callback for all pages:
myApp.onPageInit('*', function (e) {
     // Do something here when page loaded and initialized
     myApp.closePanel();
 });

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'dashboard') {
        obtenerProductos();
        // Following code will be executed for page with data-page attribute equal to "about"
        $$('#title-top-menu').html(user['nombre'] + " " + user['apellidos']);
        $$('#ciudad-menu').html('<i class="fa fa-map-marker"></i>' + user['nombre_ciudad']);
        $$('#estacion-menu').html('<i class="fa fa-tint"></i>' + user['nombre_estaciones']);
    }

    if (page.name === 'seleccionar-incentivo') {
        // Following code will be executed for page with data-page attribute equal to "about"
        obtenerIncentivos();
    }

    if (page.name === 'comisiones_productos') {
        $$('.titulo-pagina').html(fecha_comisiones);
        cargarProductosComisiones(productos_comisiones);
    }

    if (page.name === 'comisiones_productos_anio') {
        generarFechasComisiones(2018);
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})