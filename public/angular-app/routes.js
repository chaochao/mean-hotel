meanHotel.config(config).run(checkAuth);
function config($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl:'angular-app/pages/main.html',
    access: {
        restricted: false
    }
  })
  .when('/hotels', {
    templateUrl:'angular-app/pages/hotels.html',
    controller: 'HotelsController',
    controllerAs: 'ht',
    access: {
        restricted: false
    }
  })
  .when('/hotel/:hotelId', {
    templateUrl:'angular-app/pages/hotelDetals.html',
    controller: 'DisplayHotelController as dht',
    access: {
        restricted: false
      }
  })
  .when('/register', {
    templateUrl: 'angular-app/pages/register.html',
    controller: RegisterController,
    controllerAs: 'vm',
    access: {
      restricted: false
    }
  })
  .when('/secret', {
    templateUrl: 'angular-app/pages/secret.html',
    access: {
      restricted: true
    }
  })
  .otherwise({
    redirectTo: '/'
  })
}


//config

// $routeChangeStart
// everytime route in the front end it will check
function checkAuth($rootScope, $location, $window, AuthFactory){
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRout){
    // if not login then according to access give the auth
    console.log('check');
    console.log(nextRoute.access.restricted);
    if( nextRoute.access !== undefined && nextRoute.access.restricted && 
      !$window.sessionStorage.token && !AuthFactory.isLoggedIn){
      event.preventDefault();
      $location.path('/');
    }
      
  });


}