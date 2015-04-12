'use strict';

var ItemView = require('../common/item-view');
var template = require('./item-grid-template.hbs');

module.exports = ItemView.extend({
    tagName: 'li',
    template: template,
    className: 'account account--grid-view'
});
