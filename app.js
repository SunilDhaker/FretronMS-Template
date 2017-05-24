'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
//var mongoose = require('mongoose');
var config = require('./config');
var http = require('http');
var debug = require('debug')('fretron:server');

var app = express();
require('./config/express')(app);
//require('./config/mongoose');

app.use('/', express.static('public'));
if (process.env.NODE_ENV !== 'development') {
    app.use('/', express.static('public/dist'));
} else {
    app.use('/', express.static('public/app'));
}

var requestHandler = require('./requestHandler')
app.post('/command' , requestHandler.handleCommandRequestfunction);


module.exports =  app;


