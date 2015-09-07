'use strict';

var Model = require('core/model');

module.exports = Model.extend({
    defaults: {
        change: null,
        data: [],
        name: null,
        value: null
    },

    isActive: function () {
        return this.collection.active === this;
    }
});


