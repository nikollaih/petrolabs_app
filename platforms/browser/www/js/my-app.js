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
    console.log("Device is ready!");
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

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'dashboard') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
        $$('#title-top-menu').html(user['nombre'] + " " + user['apellidos']);
        $$('#ciudad-menu').html(user['nombre_ciudad']);
        $$('#estacion-menu').html(user['nombre_estaciones']);
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})