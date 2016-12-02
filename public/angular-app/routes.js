meanHotel.config(config);
function config($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl:'angular-app/pages/hotels.html',
    controller: 'HotelsController',
    controllerAs: 'ht'
  })
  .when('/hotel/:hotelId', {
    templateUrl:'angular-app/pages/hotelDetals.html',
    controller: 'ShowHotelController',
    controllerAs: 'sht'
  })
}