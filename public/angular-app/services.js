meanHotel.service('hotelsData', ['$http', function($http){
  
    this.getAll = function(){
      return $http.get("/api/hotels").catch(function(err){
        console.log(err);
      });
    }

    this.getOne = function(hotelId){
      return $http.get("/api/hotels/" + hotelId).catch(function(err){
        console.log(err);
      });
    }
}])
