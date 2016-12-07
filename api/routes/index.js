var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll);

router
  .route('/hotels/:id')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlUsers.authenticate, ctrlHotels.hotelsUpdateOne)
  .delete(ctrlUsers.authenticate, ctrlHotels.hotelsDeleteOne);


router
  .route('/hotels/new')
  .post(ctrlUsers.authenticate, ctrlHotels.hotelsAddOne);

// =============
// reviews

router
  .route('/hotels/:id/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne);


router
  .route('/hotels/:id/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlUsers.authenticate, ctrlReviews.reviewsUpdateOne) 
  .delete(ctrlUsers.authenticate, ctrlReviews.reviewsDeleteOne); 

router
  .route('/login')
  .post(ctrlUsers.login);

router
  .route('/register')
  .post(ctrlUsers.register);


module.exports = router;