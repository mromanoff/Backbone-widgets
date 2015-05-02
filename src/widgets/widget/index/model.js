'use strict';

var Model = require('core/model');
var API = require('config/api');

module.exports = Model.extend({
    defaults: {
        accountName: null,
        allocationValue: null,
        currencySymbol: null,
        allocationPercentage: null
    },
    url: API.widget1
});
