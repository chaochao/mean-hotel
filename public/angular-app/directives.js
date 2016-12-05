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