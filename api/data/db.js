var mongoose = require('mongoose');

var dburl = 'mongodb://localhost:27017/meantest'
var env = process.env.NODE_ENV || 'development'
dburl = env === 'development' ? dburl : process.env.databaseUrl

mongoose.connect(dburl);

mongoose.connection.on('connected',function(){
  console.log("Mongodb connected to: "+ dburl);
});

mongoose.connection.on('disconnected',function(){
  console.log("Mongodb disconnected to: "+ dburl);
});

mongoose.connection.on('error',function(err){
  console.log("Mongodb error: "+ err);
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log("mongodb connection shot down app termination (SIGINT)");
    process.exit(0);
  });
});

process.on('SIGTERM', function(){
  mongoose.connection.close(function(){
    console.log("mongodb connection shot down app termination (SIGTERM)");
    process.exit(0);
  });
});

process.once('SIGUSR2', function(){
  mongoose.connection.close(function(){
    console.log("mongodb connection shot down app termination (SIGUSR2)");
    process.kill(process.pid, 'SIGUSR2');
  });
});
//
require('./hotels.model.js');
