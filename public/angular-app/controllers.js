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


meanHotel.controller('HotelsController', ['$window', '$route', 'hotelDataFactory', 'hotelsData', 'AuthFactory',
  function($window, $route, hotelDataFactory, hotelsData, AuthFactory) {
    // need to sign this to a var otherwise can not get data.
    // not sure why
    var self = this;
    self.title = 'MEAN Hotel App';

    self.isLoggedIn = function() {
        return AuthFactory.isLoggedIn;
      }

    hotelDataFactory.hotelList().then(function(res) {
      self.hotels = res;
    }).catch(function(err){
      console.log(err);
    });

    self.addNewHotel = function() {
      var newHotel = {
        name: self.newHotelName,
        stars: parseInt(self.newHotelrating),
        address: self.newHoteladdress
      }
      hotelDataFactory.postHotel(newHotel).then(function(res) {
        console.log(res);
        if (res.status === 201) {
          // do a redirection
          $route.reload();

        }
      });
    }
  }
]);

meanHotel.controller('DisplayHotelController', ['hotelsData', '$routeParams', function(hotelsData, $routeParams) {
  var self = this;
  var hotelId = $routeParams.hotelId;

  hotelsData.getOne(hotelId).then(function(response) {
    self.hotel = response.data
    self.hotel.test = new Array(self.hotel.stars);
  });
}]);

// this is code from the course and do some changes
meanHotel.controller('LoginController', LoginController);

function LoginController($location, $http, AuthFactory, $window, jwtHelper) {
  var self = this;
  self.name = 'LoginController';
  console.log(AuthFactory);
  self.loggedInUser = AuthFactory.username;
  self.login = function() {
    console.log("loging click");
    console.log(self.username);
    console.log(self.password);

    if (self.username && self.password) {
      var loginUser = {
        username: self.username,
        name: self.username || '',
        password: self.password
      }
      $http.post('/api/login', loginUser).then(function(res) {
        if (res.data.success) {
          $window.sessionStorage.token = res.data.token;
          AuthFactory.isLoggedIn = true;
          var tokenInfo = jwtHelper.decodeToken(res.data.token);
          self.loggedInUser = tokenInfo.username;
          AuthFactory.username = tokenInfo.username;
          $window.sessionStorage.username = tokenInfo.username
            // console.log("after: "+ AuthFactory.toString())
        }
      }).catch(function(err) {
        console.log(err);
      });
    } else {
      // show warning 
    }
  };
  self.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.username;
    $location.path('/');
  }
  self.isLoggedIn = function() {
    // token will be store in AuthFactory 
    return AuthFactory.isLoggedIn;
  }
}

// RegisterController
meanHotel.controller('RegisterController', RegisterController);

function RegisterController($window, $http, AuthFactory) {
  var self = this;
  self.name = 'RegisterController';
  self.register = function() {
    console.log("register click");
    console.log(self.username);
    console.log(self.password);
    if (self.username && self.password) {
      var newUser = {
        username: self.username,
        name: self.username,
        password: self.password
      }
      $http.post('/api/register', newUser).then(function(res) {
        console.log(res)
        if (res.status === 201) {
          self.message = " New user has been created, login please."
        }
      }).catch(function(err) {
        console.log(err);
        self.error = err
      });
    }


    // if
    //http send to backend for login
    //get token
    // store token to session storage and server
    //do a redirect?
  };
}