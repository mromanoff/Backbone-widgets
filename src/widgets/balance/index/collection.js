'use strict';

var Collection = require('core/collection');
var API = require('config/api');

var Model = require('./model');

module.exports = Collection.extend({
    model: Model,
    url: API.balance
});

