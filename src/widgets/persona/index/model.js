'use strict';

var Model = require('core/model');
var API = require('config/api');

module.exports = Model.extend({
    defaults: {
        firstName: null,
        lastName: null,
        avatar: null,
        telephone: null
    },
    url: API.persona
});
