'use strict';

var LayoutView = require('core/layout-view');
var template = require('./template.hbs');

module.exports = LayoutView.extend({
    el: '.accounts',
    template: template,

    regions: {
        content: '.accounts__content'
    }
});
