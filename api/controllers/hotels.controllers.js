var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
  console.log('GET hotelsGetAll');
  res
    .status(200)
    .json(hotelData);
};

module.exports.hotelsGetOne = function(req, res) {
  
  console.log('GET hotelsGetOne');
  console.log(req.params.id);
  
  res
    .status(200)
    .json(hotelData);
};