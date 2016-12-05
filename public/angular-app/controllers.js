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


meanHotel.controller('HotelsController', ['$route','hotelDataFactory','hotelsData',function ($route, hotelDataFactory, hotelsData) {
  // need to sign this to a var otherwise can not get data.
  // not sure why
  var self = this; 
  self.title = 'MEAN Hotel App';
  // 1.
  hotelDataFactory.hotelList().then(function(res){
    // can't use 'this' here, it reference to others
    self.hotels = res;
  });
  // 2.
  // hotelsData.getAll().then(function(response) {
  //   // console.log(response);
  //   self.hotels = response.data;
  // });
  self.addNewHotel = function(){    
    var newHotel ={
      name: self.newHotelName,
      stars: parseInt(self.newHotelrating),
      address: self.newHoteladdress
    }
    console.log(newHotel);

    hotelDataFactory.postHotel(newHotel).then(function(res){
      console.log(res);
      if(res.status === 201){
        // do a redirection
        $route.reload();

      }
    });
  }
  

}]);

meanHotel.controller('DisplayHotelController', ['hotelsData','$routeParams', function(hotelsData, $routeParams){
  var self = this
  var hotelId = $routeParams.hotelId; 

  hotelsData.getOne(hotelId).then(function(response){
    self.hotel = response.data
    self.hotel.test = new Array(self.hotel.stars);
  });


}])
