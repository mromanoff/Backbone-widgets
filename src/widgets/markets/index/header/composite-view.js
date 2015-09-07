'use strict';

var CompositeView = require('core/composite-view');

var template = require('./composite-template.hbs');
var ItemView = require('./item-view');

module.exports = CompositeView.extend({
    template: template,
    childViewContainer: 'ul',
    childView: ItemView
});
