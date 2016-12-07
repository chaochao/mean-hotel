meanHotel.directive('displayHotel', [function(){
  return {
    restrict: 'E',
    templateUrl: '/angular-app/directives/displayHotel.html', // everything from public folder
    replace: true,
    scope:{
      hotel: "="
    }
  }
}]);
// another code style
meanHotel.directive('navBar',navBar);
// directives can have controller
function navBar(){
  return {
    restrict: 'E',
    templateUrl: '/angular-app/directives/navBar.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  }
}

// Register directives
meanHotel.directive('register',register);
function register(){
  return {
   restrict: 'E',
    templateUrl: '/angular-app/directives/register.html',
    controller: 'RegisterController',
    controllerAs: 'vm' 
  }
}