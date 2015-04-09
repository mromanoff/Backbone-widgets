var Collection = require('../common/collection');
var Model = require('./model');

module.exports = Collection.extend({
    url: '/api/accounts',
    model: Model,

    initialize: function () {
        console.log('collection', this.url);
    },

    parse: function (response) {
        //return response.allAccounts.subAccounts;
        return response;
    }
});