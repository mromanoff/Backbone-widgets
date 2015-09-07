'use strict';

var Model = require('core/model');

module.exports = Model.extend({
    defaults: {
        name: null
    },

    isActive: function () {
        return this.collection.active === this;
    }
});


