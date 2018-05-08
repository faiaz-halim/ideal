var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var albumRoutes = require('./routes/albums');
var reviewRoutes = require('./routes/xreviews');
var bookingRoutes = require('./routes/bookings');
var carRoutes = require('./routes/cars');
var customerRoutes = require('./routes/customers');
var messageRoutes = require('./routes/messages');
var teamRoutes = require('./routes/teamMembers');
var detailsRoutes = require('./routes/details');

var app = express();
mongoose.connect('mongodb://localhost/idealAuto');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/details', detailsRoutes);
app.use('/teamMembers', teamRoutes);
app.use('/messages', messageRoutes);
app.use('/customers', customerRoutes);
app.use('/cars', carRoutes);
app.use('/bookings', bookingRoutes);
app.use('/xreviews', reviewRoutes);
app.use('/albums', albumRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
