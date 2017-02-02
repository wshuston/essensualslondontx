var express = require('express');
var path = require('path');
var app = express();
var nodemailer = require('nodemailer');
var router = express.Router();

app.disable('x-powered-by');

app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'jade');

app.use(router);
app.use(express.static(path.join(__dirname, '/public')));
app.use(require('body-parser').urlencoded({extended: true}));

app.get('/', function (req, res) {
	res.render('index', {csrf: 'CSRF token here'});
	
});

app.get('/weddingstyle', function(req, res){
	res.render('weddingstyle');
});

app.listen(3000, function() {
	console.log('App listening on port 3000!');
});