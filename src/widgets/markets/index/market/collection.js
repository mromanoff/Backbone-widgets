'use strict';

var Collection = require('core/collection');
var Model = require('./model');

module.exports = Collection.extend({
    model: Model
});

