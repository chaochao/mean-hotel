var mongoose = require('mongoose');
var UserModel = mongoose.model('User')
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

// loging
module.exports.login = function(req, res){
  console.log("this is login ");
  console.log(req.body);

  if(!req.body.username || !req.body.password){
    res.status(400).json({message: "please provide username and password"});
    return;
  }
  UserModel.findOne({
    username: req.body.username
  }).exec(function(err, user){
    if(err){
      res.status(500).json(err);
    }else {
      if(user && bcrypt.compareSync(req.body.password, user.password)){
        //create token and send it to fromt
        token = jwt.sign({username: user.username}, 'this is secret', { expiresIn: 3600 *24});
        res.status(200).json({success: true, token: token});
      } else {
        res.status(401).json({message:'Unauthorized'});
      }

     
    }
  });

}



//register
module.exports.register = function(req, res){
  console.log("this is register");
  console.log(req.body);

  if(!req.body.username || !req.body.password){
    res.status(400).json({message: "please provide username and password"});
    return;
  }
  var newUser = req.body
  newUser.name = req.body.username || ''
  newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  UserModel.create(newUser, function(err, user){
    if(err){
      console.log("error when create");
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log("create new user");
      res.status(201).json({success: true, user: user});
    }
  });
}

//middleware
module.exports.authenticate = function(req, res, next){
  var token = req.headers.authorization;
  if(token){
    //jsonwebtoken verify
    jwt.verify(token, 'this is secret', function(err, decoded){
      if(err){
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.username;
        next();
      }
    })
  } else {
    res.status(403).json({message: 'No token'})
  }

}
