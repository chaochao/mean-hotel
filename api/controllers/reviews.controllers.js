var mongoose = require('mongoose');
var hotelModel = mongoose.model('HotelData');
var reviewModel = mongoose.model('Review');

function addReview(req, res, hotel) {
  
  hotel.reviews.push({
    name: req.body.name,
    rating: parseInt(req.body.rating, 10),
    review: req.body.review
  });

  hotel.save(function(err, hotelUpdated){
    if(err){
      res.status(500).send(err);
    }  else {
      res.status(200).json(hotelUpdated.reviews[hotelUpdated.reviews.length-1]);
    }
  });
  
}

module.exports.reviewsGetAll = function(req, res) {
  var hotelId = req.params.id;
  hotelModel.findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
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
    .exec(function(err, hotel) {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
      } else {
        var review = hotel.reviews.id(reviewId);
        res
          .status(200)
          .json(review);
      }
    });
}

module.exports.reviewsUpdateOne = function(req, res){
  var hotelId = req.params.id;
  var reviewId = req.params.reviewId;
  hotelModel.findById(hotelId)
  .select('reviews')
  .exec(function(err, hotel) {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err.message
      });
    } else {
      var review = hotel.reviews.id(reviewId);
      review.name = req.body.name;
      review.rating = req.body.rating || review.rating;
      review.review = req.body.review || review.review;
      // we store review in hotel not a reference
      // so need to save hotel to save review change
      // another way of doing this is to save review as reference
      // but not in this project
      //reivew.save() doesn't work
      // look for findByIdAndUpdate()
      hotel.save(); 
      res
        .status(200)
        .json(review);
    }
  });
}

module.exports.reviewsAddOne = function(req, res) {
  var hotelId = req.params.id
  hotelModel
  .findById(hotelId)
  .exec(function(err, hotel) {
    if (err) {
      res.status(500).json(err);
    } else if (!hotel) {
      res.status(404).json({
        message: "not fuound hotel with id: " + hotelId
      });
    } else {
      addReview(req, res, hotel);
    }
  });
}

