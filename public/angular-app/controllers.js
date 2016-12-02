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


meanHotel.controller('HotelsController', ['hotelDataFactory','hotelsData',function (hotelDataFactory, hotelsData) {
  // need to sign this to a var otherwise can not get data.
  // not sure why
  var self = this;
  self.title = 'MEAN Hotel App';
  // 1.
  hotelDataFactory.hotelList().then(function(res){
    self.hotels = res;
  });
  // 2.
  // hotelsData.getAll().then(function(response) {
  //   // console.log(response);
  //   self.hotels = response.data;
  // });
}]);

meanHotel.controller('ShowHotelController', ['hotelsData','$routeParams', function(hotelsData, $routeParams){
  var self = this
  var hotelId = $routeParams.hotelId; 
  self.title = hotelId;

  hotelsData.getOne(hotelId).then(function(response){
    self.hotel = response.data
  });
}])
