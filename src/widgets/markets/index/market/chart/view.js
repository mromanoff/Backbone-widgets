'use strict';

var ItemView = require('core/item-view');

var template = require('./template.hbs');
var Chart = require('./chart');

module.exports = ItemView.extend({
    template: template,

    initialize: function () {
        this.series = this.model.collection.active.toJSON().data;
    },

    onAttach: function () {
        var chart = new Chart(this.el.querySelector('.chart'), this.series);
        chart.init();
    }
});

