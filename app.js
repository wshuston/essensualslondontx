var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var emailConfig = require('../email-config.js');

var index = require('./routes/index');
var ourteam = require('./routes/ourteam');
var weddingstyling = require('./routes/weddingstyling');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/ourteam', ourteam);
app.use('/weddingstyling', weddingstyling);

app.post('/process', function(req,res){
  console.log('Form : ' + req.query.form);
  console.log('Name : ' + req.body.firstname + ' ' + req.body.lastname);
  console.log('Email : ' + req.body.email);
  console.log('Subject : ' + req.body.subject);
  console.log('Message: ' + req.body.message);
  console.log('Client Type: '+ req.body.clienttype);
  console.log('Appointment Date: '+ req.body.date);

  var name = ''+ req.body.firstname +' '+ req.body.lastname;
  var formname = req.body.form;
  var clientType = req.body.clienttype;

  console.log('var clientType: ' + clientType);

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass
    }
  });

  var mailOptions = {
    from: ''+ name +' <'+ req.body.email +'>', 
    to: emailConfig.user,
    subject: req.body.subject,
    html: '<b>Name: </b><p>'+ name +'</p><br/><b>Email: </b><p>'+ req.body.email +'</p><br/><b>Phone Number: </b><p>'+ req.body.phone +'</p><br/><b>Appointment Date: </b><p>'+ req.body.date +'</p><br/><b>Message: </b><p>'+ req.body.message +'</p><br/><b>Exisitng Client?: </b><p>'+ clientType +'</p>'
  }
  console.log(mailOptions);

  var redirectHome = function(){
    res.redirect(303, '/');
  };
  if(req.body.url === '' && req.body.telephone === ''){
    transporter.sendMail(mailOptions, function(err, res){
      if(err) {
        console.log('Error:');
        console.log(err);
      } else {
        console.log('Email Sent');
        redirectHome();
      }
    });
  } else {
    redirectHome();
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
