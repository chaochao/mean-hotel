meanHotel.service('hotelsData', ['$http', function($http){
  
    this.getAll = function(){
      return $http.get("http://localhost:3000/api/hotels");
    }

    this.getOne = function(hotelId){
      return $http.get("http://localhost:3000/api/hotels/" + hotelId);
    }
}])
