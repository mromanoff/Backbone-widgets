'use strict';

var $ = require('jquery');
var CompositeView = require('core/composite-view');
var ItemGridView = require('./item-grid-view');
var ItemListView = require('./item-list-view');
var template = require('./composite-template.hbs');

module.exports = CompositeView.extend({
    className: 'accounts',
    template: template,
    events: {
        'click button': 'toggleView'
    },

    initialize: function () {

    },

    childViewContainer: 'ul',

    getChildView: function () {
        return (this.layout === 'list') ? ItemListView : ItemGridView;
    },

    toggleView: function (e) {
        e.preventDefault();
        this.layout = $(e.currentTarget).data('view');
        this.render();
    }
});
