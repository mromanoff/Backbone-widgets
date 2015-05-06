'use strict';

var d3 = require('d3');


var HorizontalBarGraph = function (el, series) {
    this.el = d3.select(el);
    this.series = series;
};

HorizontalBarGraph.prototype.draw = function () {
    var x = d3.scale.linear()
        .domain([0, d3.max(this.series, function (d) {
            return d.value;
        })])
        .range([0, 100]);

    var segment = this.el
        .selectAll('.horizontal-bar-graph-segment')
        .data(this.series)
        .enter()
        .append('div').classed('horizontal-bar-graph-segment', true);

    segment
        .append('div').classed('horizontal-bar-graph-label', true)
        .text(function (d) {
            return d.label;
        });

    segment
        .append('div').classed('horizontal-bar-graph-value', true)
        .append('div').classed('horizontal-bar-graph-value-bar', true)
        .style('background-color', function (d) {
            return d.color;
        })
        .text(function (d) {
            //return d.innerLabel ? d.innerLabel : '';
            return d.value ? d.value : '';
        })
        .transition()
        .duration(1000)
        .style('min-width', function (d) {
            return x(d.value) + '%';
        });
};

module.exports = HorizontalBarGraph;

