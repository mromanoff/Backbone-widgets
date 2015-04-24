'use strict';

var Router = require('../../common/core/router');
var IndexRoute = require('./route');

module.exports = Router.extend({
    initialize: function (options) {
        this.container = options.container;
    },

    routes: {
        '': 'index'
    },

    index: function () {
        return new IndexRoute({
            container: this.container
        });
    }
});
