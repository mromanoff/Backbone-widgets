'use strict';

var d3 = require('d3');

//TODO:MR refactor init.

var AreaChart = function (el, series) {
    this.el = el;
    this.series = series;
    this.margin = {top: 20, right: 20, bottom: 30, left: 50};
    //this.width = 400 - this.margin.left - this.margin.right;
    //this.height = 350 - this.margin.top - this.margin.bottom;
    this.width = 400;
    this.height = 350;
    this.padding = 30;
};

AreaChart.prototype.getDate = function (d) {
    //console.log('date data', d);
    var format = d3.time.format('%Y-%m-%d');
    //console.log('date data formated', format.parse(d));
    return format.parse(d);
};


//AreaChart.prototype.parseDate = d3.time.format('%d-%b-%y').parse;

AreaChart.prototype.init = function () {
    var maxDate = this.getDate(this.series[0][0]);
    var minDate = this.getDate(this.series[this.series.length - 1][0]);

    var xScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([this.padding, this.width - this.padding]);

    var yScale = d3.scale.linear()
        .domain([
            d3.min(this.series, function (d) {
                return d[1];
            }),
            d3.max(this.series, function (d) {
                return d[1];
            })
        ])
        .range([this.height - this.padding, this.padding]);

    var xAxisGen = d3.svg.axis()
        .scale(xScale)
        .orient('bottom').tickFormat(d3.time.format('%b'));

    var yAxisGen = d3.svg.axis()
        .scale(yScale)
        .orient('left').ticks(4);

    var lineFun = d3.svg.line()
        .x(function (d, i) {
            return xScale(this.getDate(d[0]));
        }.bind(this))
        .y(function (d) {
            return yScale(d[1]);
        })
        //.interpolate('basis');
        .interpolate('linear');

    var svg = d3.select(this.el)
        .append('svg')
        .attr({
            width: this.width,
            height: this.height
        });

    var yAxis = svg.append('g').call(yAxisGen)
        .attr('class', 'axis')
        .attr('transform', 'translate(' + this.padding + ')');

    var xAxis = svg.append('g').call(xAxisGen)
        .attr('class', 'axis')
        .attr('transform', 'translate(0, ' + (this.height - this.padding) + ')');

    var viz = svg.append('path')
        .attr({
            d: lineFun(this.series),
            'stroke': 'rgb(152, 171, 211)',
            'stroke-width': 2,
            'fill': 'none'
        });
};

module.exports = AreaChart;
