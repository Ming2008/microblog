var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var devlogger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var settings = require("./settings");
var MongoStore = require("connect-mongo")(session);
var flash = require('connect-flash');
var routes = require('./routes/index');
var users = require('./routes/users');
/*
log4js
 */
var logger = require('./models/logHelper').helper;
var log = require('./models/logHelper');

var app = express(); 
log.use(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(devlogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({ 
	secret:settings.cookieSecret,
	store:new MongoStore({
		db:settings.db,
		url:'mongodb://localhost/microblog'
	}),
	resave:true,
	saveUninitialized:true
}));



//获取状态
app.use(function(req,res,next){
    console.log("app.usr local");
    res.locals.user = req.session.user;
  //  res.locals.post = req.session.post;
    var error = req.flash('error');
    res.locals.error = error.length?error:null;

    var success = req.flash('success');
    res.locals.success = success.length?success:null;

    next();
});

app.use('/', routes);
app.use('/users', users);

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
