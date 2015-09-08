'use strict';

var ItemView = require('core/layout-view');
var template = require('./layout-template.hbs');

var ListView = require('./list/composite-view');
var ChartView = require('./chart/view');

module.exports = ItemView.extend({
    template: template,

    regions: {
        list: '.list',
        chart: '.chart'
    },

    initialize: function () {
        this.listenTo(this.collection, 'active', this.updateViews);
    },

    onBeforeShow: function () {
        this.listView = new ListView({
            collection: this.collection
        });

        this.chartView = new ChartView({
            collection: this.collection,
            model: this.collection.active
        });
    },

    onShow: function () {
        this.list.show(this.listView);
        this.chart.show(this.chartView);
    },


    updateViews: function () {
        this.onBeforeShow();
        this.onShow();
    }
});
