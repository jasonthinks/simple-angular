angular.module('myApp').config(function($routeProvider){
	$routeProvider.when	('/', {
		templateUrl : 'templates/home.html',
	})
	$routeProvider.when	('/allproducts', {
		templateUrl : 'templates/allproducts.html',
	})
	$routeProvider.when	('/single-product', {
		templateUrl : 'templates/single-product.html',
	})
	$routeProvider.when	('/about-us', {
		templateUrl : 'templates/about-us.html',
	})
	$routeProvider.when	('/portfolio', {
		templateUrl : 'templates/portfolio.html',
	})


});
