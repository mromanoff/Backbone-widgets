'use strict';

var ItemView = require('core/layout-view');
var template = require('./layout-template.hbs');

module.exports = ItemView.extend({
    template: template,

    regions: {
        header: '.header',
        market: '.market'
    }
});
