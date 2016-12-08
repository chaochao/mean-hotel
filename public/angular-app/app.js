var meanHotel = angular.module('meanHotel',['ngRoute', 'angular-jwt']);
meanHotel.config(function($httpProvider){
  // this is for add auth when talk to back end
  // and store login user name and token
  $httpProvider.interceptors.push('AuthInterceptor');

  // this is for post data to back end
  // angular send payload not form data so need to do some transform
  $httpProvider.defaults.transformRequest = function(obj) {
    var str = [];
    for (var p in obj) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    return str.join("&");
  };
  $httpProvider.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';  
});
console.log("start");
