var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll);

router
  .route('/hotels/:id')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne)
  .delete(ctrlHotels.hotelsDeleteOne);


router
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne);

// =============
// reviews

router
  .route('/hotels/:id/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlReviews.reviewsAddOne);

router
  .route('/hotels/:id/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;