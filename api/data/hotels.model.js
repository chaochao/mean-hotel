var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
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

var roomSchema = new mongoose.Schema({
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

var hotelSchema = new mongoose.Schema({
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

var userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },
  nickname: String,
  password: {
    type: String,
    required: true
  }
});


mongoose.model('HotelData', hotelSchema, 'hotelData');
mongoose.model('Review', reviewSchema);
mongoose.model('User', userSchema);