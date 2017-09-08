var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/', express.static(path.join(__dirname, 'app')));

router.get('/', function(req, res) {
  res.render('index.html');
});

module.exports = router;
