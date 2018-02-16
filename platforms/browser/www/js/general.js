var config = {base_url: '', url_services : 'http://localhost/petrolabs/'};
var user = [];

$$(document).on('click', '#login-button', function(){
	myApp.showPreloader();
	login();
})