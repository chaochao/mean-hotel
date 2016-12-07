// another way
// meanHotel.controller('HotelsController', HotelsController);

// function HotelsController(hotelsData) {
//   var vm = this;
//   vm.title = 'MEAN Hotel App';
//   hotelsData.getAll().then(function(response) {
//     // console.log(response);
//     vm.hotels = response.data;
//   });
// }


meanHotel.controller('HotelsController', ['$route', 'hotelDataFactory', 'hotelsData', function($route, hotelDataFactory, hotelsData) {
  // need to sign this to a var otherwise can not get data.
  // not sure why
  var self = this;
  self.title = 'MEAN Hotel App';
  // 1.
  hotelDataFactory.hotelList().then(function(res) {
    // can't use 'this' here, it reference to others
    self.hotels = res;
  });
  // 2.
  // hotelsData.getAll().then(function(response) {
  //   // console.log(response);
  //   self.hotels = response.data;
  // });
  self.addNewHotel = function() {
    var newHotel = {
      name: self.newHotelName,
      stars: parseInt(self.newHotelrating),
      address: self.newHoteladdress
    }
    console.log(newHotel);

    hotelDataFactory.postHotel(newHotel).then(function(res) {
      console.log(res);
      if (res.status === 201) {
        // do a redirection
        $route.reload();

      }
    });
  }


}]);

meanHotel.controller('DisplayHotelController', ['hotelsData', '$routeParams', function(hotelsData, $routeParams) {
  var self = this;
  var hotelId = $routeParams.hotelId;

  hotelsData.getOne(hotelId).then(function(response) {
    self.hotel = response.data
    self.hotel.test = new Array(self.hotel.stars);
  });
}])

// this is code from the course and do some changes
meanHotel.controller('LoginController', LoginController);

function LoginController($http, AuthFactory){
  var self = this;
  self.name = 'LoginController';
  self.isLoggedIn = AuthFactory.auth.isLoggedIn;
  self.login = function(){
    console.log("loging click");
    console.log(self.username);
    console.log(self.password);
    //http send to backend for login
    //get token
    // store token to session storage and server
    //do a redirect?
  };
}

// RegisterController
meanHotel.controller('RegisterController', RegisterController);
function RegisterController($http, AuthFactory){
  var self = this;
  self.name = 'RegisterController'
  self.register = function(){
    console.log("register click");
    console.log(self.username);
    console.log(self.password);
    //http send to backend for login
    //get token
    // store token to session storage and server
    //do a redirect?
  };
}



// function LoginController($http, $location, $window, AuthFactory, jwtHelper) {
//   var self = this;

//   // self.isLoggedIn = function() {
//   //   if (AuthFactory.isLoggedIn) {
//   //     return true;
//   //   } else {
//   //     return false;
//   //   }
//   // };

//   // self.login = function() {
//   //   if (self.username && self.password) {
//   //     var user = {
//   //       username: self.username,
//   //       password: self.password
//   //     };

//   //     $http.post('/api/users/login', user).then(function(response) {
//   //       if (response.data.success) {
//   //         $window.sessionStorage.token = response.data.token;
//   //         AuthFactory.isLoggedIn = true;
//   //         var token = $window.sessionStorage.token;
//   //         var decodedToken = jwtHelper.decodeToken(token);
//   //         self.loggedInUser = decodedToken.username;
//   //       }
//   //     }).catch(function(error) {
//   //       console.log(error);
//   //     })

//   //   }
//   // }

//   // self.logout = function() {
//   //   AuthFactory.isLoggedIn = false;
//   //   delete $window.sessionStorage.token;
//   //   $location.path('/');
//   // }

//   // self.isActiveTab = function(url) {
//   //   var currentPath = $location.path().split('/')[1];
//   //   return (url === currentPath ? 'active' : '');
//   // }
// }




