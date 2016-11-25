var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
  console.log(req.query);
  var count = req.query.count || 10;
  var offset = req.query.offset || 0;
  var end = offset + count;
  var result = hotelData.slice(offset,end);

  res
    .status(200)
    .json(result);
};

module.exports.hotelsGetOne = function(req, res) {
  
  var hotelId = req.params.id;

  var oneHotel = hotelData[hotelId]
  res
    .status(200)
    .json(oneHotel);
};

module.exports.hotelsAddOne = function(req, res) {
  console.log("this is post route");
  var hotelId = req.params.id;
  console.log(req.body);

  var oneHotel = hotelData[hotelId]
  res
    .status(200)
    .json(req.body);
};