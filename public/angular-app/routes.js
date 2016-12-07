meanHotel.config(config).run(checkAuth);
function config($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl:'angular-app/pages/main.html'
  })
  .when('/hotels', {
    templateUrl:'angular-app/pages/hotels.html',
    controller: 'HotelsController',
    controllerAs: 'ht'
  })
  .when('/hotel/:hotelId', {
    templateUrl:'angular-app/pages/hotelDetals.html',
    controller: 'DisplayHotelController as dht',
  })
  .otherwise({
    redirectTo: '/'
  })
}


// $routeChangeStart
function checkAuth(){
  
}