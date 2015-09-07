'use strict';

var ItemView = require('core/item-view');
var template = require('./item-template.hbs');

module.exports = ItemView.extend({
    template: template,
    tagName: 'a',

    events: {
        'click': 'updateChart'
    },

    updateChart: function (e) {
        e.preventDefault();
        if (!this.model.isActive()) {
            this.model.collection.active = this.model;
            this.model.collection.trigger('active');
        }
    },

    attributes: function () {
        return {
            class: 'list-group-item' + (this.model.isActive() ? ' active' : '')
        };
    }
});

