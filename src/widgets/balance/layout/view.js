'use strict';

var LayoutView = require('core/layout-view');
var template = require('./template.hbs');

module.exports = LayoutView.extend({
    el: '.balance',
    template: template,

    regions: {
        content: '.balance__content'
    }
});
