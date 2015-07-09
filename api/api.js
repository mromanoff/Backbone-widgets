var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var api = module.exports = express();

api.use(logger('dev'));
api.use(bodyParser.json());

require('./accounts/routes')(api);
require('./persona/routes')(api);
require('./chart/routes')(api);
require('./balance/routes')(api);

module.exports = api;