'use strict';

var Model = require('../common/core/model');

module.exports = Model.extend({
    defaults: {
        accountName: null,
        allocationValue: null,
        allocationPercentage: null
    },

    isActive: function() {
        return this.collection.active === this;
    }
});
