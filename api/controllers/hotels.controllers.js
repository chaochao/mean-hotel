// var hotelModel = require('../data/hotels.model')
var mongoose = require('mongoose');
var hotelModel = mongoose.model('HotelData');

function getGeoQuery (req,res){
  console.log(req.query.lng)
  //TODO: validation for lng lat
  // if not send 400 bad request
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var point ={
    type: 'Point',
    coordinates: [lng, lat]
  }

  var geoOptions ={
    maxDistance: 2000,
    spherical: true,
    num: 5
  }
  hotelModel
  .geoNear(point,geoOptions, function(err, result, status){
    if(err){
      console.log(err);
      res.status(500).send(err);  
    } else{
      res.status(200).send(result);  
    }
  });
}

module.exports.hotelsGetAll = function(req, res) {

  if(req.query.lng && req.query.lat){
    getGeoQuery(req,res);
    return
  }
  //TODO: validation offset over data length or some other
  var count = parseInt(req.query.count) || 10;
  var offset = parseInt(req.query.offset) || 0;
  var end = offset + count;
  hotelModel
  .find()
  .skip(offset)
  .limit(count)
  .exec(function(err,hotels){
    if(err){
      console.log("get all error: " + error);
      res.status(500).send();
    } else {
      res
        .status(200)
        .json(hotels);
        }
  });
  
};

module.exports.hotelsGetOne = function(req, res) {

  var hotelId = req.params.id;
  hotelModel.findById(hotelId, function(err,hotel){
    if(err){
      console.log(err);
      res.status(500).json({error: err.message});
    } else {
      res
        .status(200)
        .json(hotel);
    }
  });
  
};

module.exports.hotelsAddOne = function(req, res) {
  //TODO: more items
  if(!req.body.name || !req.body.address || !req.body.stars){
    res.status(400).send("invalid data");
    return;
  }
  var newHotel = req.body;
  newHotel.stars = parseInt(req.body.stars);

  hotelModel.create(newHotel,function(err,hotel){
    if(err){
      console.log(err);
    } else {
      res
        .status(201)
        .json(hotel);  
    }
  })

  
  
};

module.exports.hotelsUpdateOne = function(req, res){
  var hotelId = req.params.id;
  //TODO: More validation
  var hotel ={
    name: req.body.name,
    description: req.body.description,
    stars: parseInt(req.body.stars),
    currency: req.body.currency
  }
  hotelModel.findByIdAndUpdate(hotelId,hotel, function(err,newHotel){
    if(err){
      res.status(500).json(err);
    }else {
      res.status(200).json(newHotel)
    }
  });
}

module.exports.hotelsDeleteOne = function(req, res){
  var hotelId = req.params.id;
  hotelModel.findByIdAndRemove(hotelId,function(err,hotel){
    if(err){
      res.status(500).json(err);
    } else{
      res.status(204).json();
    }
  });

}

