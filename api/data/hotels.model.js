var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    "default": Date.now()
  }
});

var roomSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  description: String,
  photos: [String],
  price: Number
});
var hotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    min: 0,
    max: 5,
    "default": 0
  },
  services: [String],
  description: String,
  phtos: [String],
  currency: String,
  reviews: [reviewSchema],
  rooms: [roomSchema],
  location: {
    address: String,
    //longtitude,latitude
    coordinates:{
      type: [Number],
      index: '2dsphere'
    } 
  }
});

mongoose.model('HotelData', hotelSchema, 'hotelData');
mongoose.model('Review', reviewSchema);