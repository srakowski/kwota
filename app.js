var express = require('express');
var session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var User = require('./models/user');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var sign = require('./routes/sign');
var apiQuota = require('./api/quota');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'ermahgerd'}));
app.use(passport.initialize());
app.use(passport.session());

var auth = function(req, res, next) { 
    if (!req.isAuthenticated()) { 
        res.redirect("/sign/in");
    } else {
        next();
    } 
};

app.get('*', function(req, res, next) {
  res.locals.loggedIn = (req.user) ? true : false;
  next();
});

app.use('/api/quota', auth, apiQuota);
app.use('/sign', sign);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/kwota_dev', function(err) {
  if (err) {
      console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
  } else {
      console.log('Connected to mongodb');
  }
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
 