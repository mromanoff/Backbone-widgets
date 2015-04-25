'use strict';

var Model = require('../../../common/core/model');
var API = require('../../../config/api-config');

module.exports = Model.extend({
    defaults: {
        accountName: null,
        allocationValue: null,
        currencySymbol: null,
        allocationPercentage: null
    },
    url: API.widget1
});
