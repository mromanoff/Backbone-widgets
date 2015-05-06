'use strict';

var Model = require('core/model');
var API = require('config/api');

module.exports = Model.extend({
    defaults: {
        label: null,
        innerLabel: null,
        value: null,
        color: '#000'
    },

    url: API.widget1
});
