'use strict';

var Collection = require('../common/core/collection');
var Model = require('./model');
var API = require('../common/api-config');

module.exports = Collection.extend({
    url: API.accounts,
    model: Model,

    initialize: function () {
        console.log('collection', this.url);
    },

    parse: function (response) {
        return response;
    }
});

