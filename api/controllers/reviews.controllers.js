var mongoose = require('mongoose');
var hotelModel = mongoose.model('HotelData');
var reviewModel = mongoose.model('Review');

module.exports.reviewsGetAll = function(req, res) {
  var hotelId = req.params.id;
  // hotelModel.findById(hotelId, function(err, hotel){
  //   if(err){
  //     console.log(err);
  //     res.status(500).json({error: err.message});
  //   } else {
  //     res
  //       .status(200)
  //       .json(hotel.reviews);
  //   }
  // });
  hotelModel.findById(hotelId)
  .select('reviews')
  .exec( function(err, hotel){
    if(err){
      console.log(err);
      res.status(500).json({error: err.message});
    } else {
      res
        .status(200)
        .json(hotel.reviews);
    }
  });
}
module.exports.reviewsGetOne = function(req, res) {
  var hotelId = req.params.id;
  var reviewId = req.params.reviewId;
  hotelModel.findById(hotelId)
  .select('reviews')
  .exec( function(err, hotel){
    if(err){
      console.log(err);
      res.status(500).json({error: err.message});
    } else {
      var review = hotel.reviews.id(reviewId);
      res
        .status(200)
        .json(review);
    }
  });

}

module.exports.reviewsAddOne = function(req, res){
  res.send("this is reviewsAddOne");
}