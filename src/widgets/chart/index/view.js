'use strict';

var ItemView = require('core/item-view');
var template = require('./template.hbs');
var _ = require('underscore');

var Chart = require('./chart');

module.exports = ItemView.extend({
    template: template,

    events: {
        'click button': 'reload'
    },

    onRender: function () {
        var chart = new Chart(
            this.el.querySelector('.horizontal-bar-graph'),
            _.chain(this.collection.toJSON())
                .sample(4)
                .value()
        );
        chart.init();
    },

    reload: function () {
        this.render();
    }
});
