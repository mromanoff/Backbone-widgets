'use strict';

var LayoutView = require('core/layout-view');
var template = require('./template.hbs');

module.exports = LayoutView.extend({
    el: '.markets',
    template: template,

    regions: {
        content: '.widget__content'
    }
});
