'use strict';

var d3 = require('d3');

var Chart = function (el, series) {
    this.el = el;
    this.series = series;
    this.w = 620;
    this.h = 40;
    this.padding = 1;
};

Chart.prototype = {
    init: function () {
        this.renderChart();
    },

    // create closure
    getOffset: (function () {
        var x = 0;

        function offset(i) {
            if (i === 0) {
                x = 0;
                return x;
            } else {
                x += Math.floor((this.series[i - 1].value * 100 / this.getTotal(this.series)) / 100 * this.w);
                return x;
            }
        }
        return offset;
    })(),

    getTotal: function (data) {
        var total = 0;
        data.forEach(function (item) {
            total += item.value;
            return total;
        });
        return total;
    },

    renderChart: function () {
        var svg = d3.select(this.el)
            .append('svg')
            .attr('preserveAspectRatio', 'xMinYMid meet')
            .attr('viewBox', '0 0 600 100');

        svg.selectAll('rect')
            .data(this.series)
            .enter()
            .append('rect')
            .attr({
                x: function (d, i) {
                    return this.getOffset(i);
                }.bind(this),

                y: function () {
                    return 0;
                },

                width: function (d) {
                    return Math.floor((d.value * 100 / this.getTotal(this.series)) / 100 * this.w);
                }.bind(this),

                height: function () {
                    return 20;
                },

                fill: function (d) {
                    return d.color;
                }
            });
    }
};

module.exports = Chart;