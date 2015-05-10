'use strict';

var LayoutView = require('core/layout-view');
var template = require('./template.hbs');

module.exports = LayoutView.extend({
    el: '.persona',
    template: template,

    regions: {
        content: '.persona__content'
    }
});
