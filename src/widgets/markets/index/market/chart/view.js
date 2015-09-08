'use strict';

var ItemView = require('core/item-view');

var template = require('./template.hbs');
var Chart = require('./chart');

module.exports = ItemView.extend({
    template: template,

    onBeforeShow: function () {
        this.series = this.model.collection.active.toJSON().data;
        this.chart = new Chart(this.el.querySelector('.chart'), this.series);
    },

    onShow: function () {
        this.chart.init();
    }
});

