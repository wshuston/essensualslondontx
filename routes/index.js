var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "Essensuals London TX"});
});

/* GET promo page */
router.get('/weddingstyling', function(req, res, next) {
  res.render('weddingstyling', {title: "Essensuals London TX - Wedding Styling"});
});

module.exports = router;
