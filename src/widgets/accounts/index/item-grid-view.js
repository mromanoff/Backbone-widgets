'use strict';

var ItemView = require('core/item-view');
var template = require('./item-grid-template.hbs');

var Chart = require('./chart');

module.exports = ItemView.extend({
    tagName: 'li',
    template: template,
    className: 'account account--grid-view',

    initialize: function () {
        this.series = this.model.toJSON().series;
    },

    onShow: function () {
        var chart = new Chart(this.el.querySelector('.account__chart'), this.series);
        chart.init();
    }
});
