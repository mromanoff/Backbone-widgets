'use strict';

var CompositeView = require('core/composite-view');
var template = require('./composite-template.hbs');
var ItemView = require('./item-view');

module.exports = CompositeView.extend({
    template: template,
    childView: ItemView,
    childViewContainer: '.list-group',

    initialize: function () {
        //this.listenTo(this.collection, 'active', this.render);
    }
});
