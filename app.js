var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var emailConfig = require('./email-config.js');

var index = require('./routes/index');
// var users = require('./routes/users');
var weddingstyling = require('./routes/weddingstyling');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
app.use('/weddingstyling', weddingstyling);

app.post('/process', function(req,res){
  console.log('Form : ' + req.query.form);
  console.log('Name : ' + req.body.firstname + ' ' + req.body.lastname);
  console.log('Email : ' + req.body.email);
  console.log('Subject : ' + req.body.subject);
  console.log('Message: ' + req.body.message);

  var name = ''+ req.body.firstname +' '+ req.body.lastname;

  // var transporter = nodemailer.createTransport({
  //   service: 'Gmail',
  //   auth: {
  //     xoauth2: xoauth2.createXOAuth2Generator({
  //       user: 'essensuals.appointments@gmail.com',
  //       clientId: '837564773657-ca8ci4apfr1j9u9uq5v5v6j0tlq6afaf.apps.googleusercontent.com',
  //       clientSecret: 'yk22OJCqos6WoLW24dYMo4bM',
  //       refreshToken: '1/cEXbj-K-djW52G7cWroOuMPA_6wWsE5IMBUzTc3odjanamHI4AEApqGyplpLXsGO',
  //     })
  //   }
  // });

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass
    }
  });

  var mailOptions = {
    from: ''+ name +' <'+ req.body.email +'>', 
    to: 'whs.pro@gmail.com',
    subject: req.body.subject,
    html: '<b>Name: </b><p>'+ name +'</p><br/><b>Message: </b><p>'+ req.body.message +'</p>'
  }
  console.log(mailOptions);

  var redirectHome = function(){
    res.redirect(303, '/');
  };
  transporter.sendMail(mailOptions, function(err, res){
    if(err) {
      console.log('Error:');
      console.log(err);
    } else {
      console.log('Email Sent');
      redirectHome();
    }
  });
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
