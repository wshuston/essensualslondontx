var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/ourteam/:name', function(req, res, next) {
  res.render('ourteam', {name:req.params.name});
});

module.exports = router;
