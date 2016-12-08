meanHotel.factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http) {
  return {
    hotelList: hotelList,
    hotelDisplay: hotelDisplay,
    postHotel: postHotel
  };

  function hotelList() {
    return $http.get('/api/hotels?count=100').then(complete).catch(failed);
  }

  function hotelDisplay(id) {
    return $http.get('/api/hotels/' + id).then(complete).catch(failed);
  }

  function postReview(id, review) {
    return $http.post('/api/hotels/' + id + '/reviews', review).then(complete).catch(failed);
  }

  function postHotel(newHotel) {
    return $http({
      method: 'POST',
      url: '/api/hotels/new',
      data: newHotel,
    }).then(complete).catch(failed);
  }

  function complete(response) {
    // filter data
    return response.data;
  }

  function failed(error) {
    console.log(error.statusText);
  }
}


meanHotel.factory('AuthFactory', function(){
  return {
    username: '',
    isLoggedIn: false
  };
});

//there is the intercepter for set up http request 

