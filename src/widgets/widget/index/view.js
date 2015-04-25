'use strict';

var ItemView = require('../../../common/core/item-view');
var template = require('./template.hbs');

module.exports = ItemView.extend({
    template: template,
    className: 'widget'
});
