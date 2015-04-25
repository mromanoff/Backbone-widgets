'use strict';

var ItemView = require('../../../common/core/item-view');
var template = require('./item-list-template.hbs');

module.exports = ItemView.extend({
    tagName: 'li',
    template: template,
    className: 'account account--list-view'
});
