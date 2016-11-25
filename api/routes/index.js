var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
//get all
router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll);

//get one hotel data
router
  .route('/hotels/:id')
  .get(ctrlHotels.hotelsGetOne);

// create
router
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne)
// edit

//delete
module.exports = router;