var hotelJsonData = require('../data/hotel-data.json');
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;
// for only read you don't need the schema definition
//but if you want to insert you must input all field
//OR YOU WILL NOT BE ABLE TO CREATE DATA
var hotelSchema = new Schema({
  name: String
  //... much more but only for test
})
var hotel = mongoose.model("hoteldbData",hotelSchema,'hotelData');
module.exports.hotelsGetAll = function(req, res) {
  console.log(req.query);
  var count = req.query.count || 10;
  var offset = req.query.offset || 0;
  var end = offset + count;
  var result = hotelJsonData.slice(offset,end);

  hotel.findById("583918740235137c4476b97f",function(err,data){console.log("test"+data)});
  // hotel.create({name:"test"}, function(err,data){
  //   if(err){
  //     console.log("wrong"+err);
  //   }else{
  //     console.log(data);
  //   }
  // });
  res
    .status(200)
    .json(result);
};

module.exports.hotelsGetOne = function(req, res) {
  
  var hotelId = req.params.id;

  var oneHotel = hotelJsonData[hotelId]
  res
    .status(200)
    .json(oneHotel);
};

module.exports.hotelsAddOne = function(req, res) {
  console.log("this is post route");
  var hotelId = req.params.id;
  console.log(req.body);

  var oneHotel = hotelJsonData[hotelId]
  res
    .status(200)
    .json(req.body);
};