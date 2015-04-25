'use strict';

var Collection = require('../../../common/core/collection');
var Model = require('./model');
var API = require('../../../config/api-config');

module.exports = Collection.extend({
    model: Model,
    url: API.accounts,


    initialize: function () {
        console.log('collction', API.accounts);
    },

    parse: function (response) {
        return response;
    }
});

