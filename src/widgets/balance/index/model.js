'use strict';

var Model = require('core/model');

module.exports = Model.extend({
    defaults: {},

    initialize: function () {
        var nodes = this.get('nodes');
        if (nodes) {
            // include here. avoid circular dependency
            var Collection = require('./collection');
            this.nodes = new Collection(nodes);
            this.unset('nodes');
        }
    }
});

