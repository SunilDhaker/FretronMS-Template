var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	config = require('./index'),
	_ = require('lodash'),
	fs = require('fs'),
	helmet = require('helmet'),
	logger = require('morgan'),
	url = require('url');

var path = require('path');

var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);

var compression = require('compression');
var sessionOptions = {
	// store: new MongoStore({
	//     url: config.db,
	//     ttl: 14 * 24 * 60 * 60 // = 14 days. Default
	// }),
	key: 'auth_token',
	secret: "supersecrectcodeforsecureserver",
	// cookie: config.cookieOptions,
	proxy: true,
	name: 'sid',
	resave: true,
	saveUninitialized: true,
};

module.exports = function (app) {
	app.set('showStackError', true);
	app.use(helmet());
	// Prettify HTML
	app.locals.pretty = true;

	// Only use logger for development environment
	if (process.env.NODE_ENV === 'development') {
		app.use(logger('dev'));
	}
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Credentials', true);
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-header-authtoken,refreshToken,os-type,x-app-version,role");
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

		if (req.method == 'OPTIONS') {
			return res.send(200);
		}
		next();
	});
	// Enable jsonp
	app.enable("jsonp callback");


	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function (err, req, res, next) {
			res.status(err.status || 500);
			res.send({
				success: false,
				result: { error: err.message, message: err }
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.send({
			message: err.message,
			error: {}
		});
	});


	// The cookieParser should be above session
	app.use(cookieParser());
	app.use(compression());
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(session(sessionOptions));
	// view engine setup
};