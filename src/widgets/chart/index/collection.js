'use strict';

var Collection = require('core/collection');
var Model = require('./model');
var API = require('config/api');

module.exports = Collection.extend({
    model: Model,
    url: API.charts
});

