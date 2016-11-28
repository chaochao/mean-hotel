var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var routes = require('./api/routes');
var mongoose = require('mongoose');
// Define the port to run on
app.set('port', 3000);
var env =process.env.NODE_ENV || 'development'
var mongodb_url = env === 'development' ? "mongodb://localhost/meantest" : process.env.databaseUrl
mongoose.connect(mongodb_url)
// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
// set false will not support other data type
app.use(bodyParser.urlencoded({extended: false}));
// Add some routing
app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
