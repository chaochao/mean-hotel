var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
//get all
router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll);

//get one hotel data
router
  .route('/hotels/:id')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne);

// create
router
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne)

// =============
// reviews
router
  .route('/hotels/:id/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlReviews.reviewsAddOne);

router
  .route('/hotels/:id/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne);

module.exports = router;