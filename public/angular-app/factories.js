meanHotel.factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http) {
  return {
    hotelList: hotelList,
    hotelDisplay: hotelDisplay,
    postReview: postReview,
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
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function(obj) {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
      }  
    })

  }

  function complete(response) {
    // filter data
    return response.data;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}