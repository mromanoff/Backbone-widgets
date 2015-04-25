'use strict';

var LayoutView = require('../../../common/core/layout-view');
var template = require('./layout-template.hbs');

module.exports = LayoutView.extend({
    el: '.widget2',
    template: template,

    regions: {
        content: '.widget2__content'
    }
});
