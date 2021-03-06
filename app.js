require('./api/data/db');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var routes = require('./api/routes');
// Define the port to run on
app.set('port', 3000);
var env = process.env.NODE_ENV || 'development'

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
//Set node_module path
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
// set false will not support other data type
app.use(bodyParser.urlencoded({extended: false}));
// Add some routing
app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log(' open on port ' + port);
});
