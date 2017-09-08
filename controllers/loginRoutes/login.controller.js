var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../../models/testSchema');
var Employee = require('../../models/user.schema.js');
var config = require('../../config');

router.use('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res) {
  res.json({
    success: true,
    message: 'U are hitting loging get'
  });
  // res.send('login route.. please enter user name and password');
});

router.post('/', authenticateUser);

function authenticateUser(req, res) {

  User.findOne({ userName: req.body.username }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).json({success: false, message: 'Authentication failed. Please Register !'});
    } else if(user) {
       if (user.password != req.body.password) {
        res.status(401).json({success: false, message: 'Password is invalid'});
       } else {
           var token = jwt.sign(user, config.JWT_SECRET, {
             expiresIn : 60 * 60 * 60// expires in 24 hours
           });

           res.status(200).json({
             success: true,
             message: 'Enjoy your token!',
             token: token,
             user: user,
           });
       }
   }

  });
}

module.exports = router;
