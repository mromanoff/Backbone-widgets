'use strict';

var Model = require('core/model');
var API = require('config/api').markets;

module.exports = Model.extend({
    defaults: {},
    url: API
});


