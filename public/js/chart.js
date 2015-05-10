(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
Backbone.$ = require('jquery');


var Widget = require('./layout/module');

var widget = new Widget();

widget.module('index', {
    moduleClass: require('./index/module'),
    container: widget.layout.content
});

},{"./index/module":6,"./layout/module":9,"backbone":"backbone","jquery":"jquery"}],2:[function(require,module,exports){
'use strict';

var API = {
    accounts: '/api/accounts',
    persona: '/api/persona',
    charts: '/api/charts'
};

module.exports = API;



},{}],3:[function(require,module,exports){
'use strict';

var Collection = require('core/collection');
var Model = require('./model');
var API = require('config/api');
var _ = require('underscore');

module.exports = Collection.extend({
    model: Model,
    url: API.charts
});


},{"./model":5,"config/api":2,"core/collection":"core/collection","underscore":"underscore"}],4:[function(require,module,exports){
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


},{"d3":"d3"}],5:[function(require,module,exports){
'use strict';

var Model = require('core/model');
var API = require('config/api');

module.exports = Model.extend({
    defaults: {
        label: null,
        innerLabel: null,
        value: null,
        color: '#000'
    },

    url: API.widget1
});

},{"config/api":2,"core/model":"core/model"}],6:[function(require,module,exports){
'use strict';

var Module = require('core/module');
var Collection = require('./collection');
var View = require('./view');

module.exports = Module.extend({
    initialize: function () {
        this.container = this.options.container;
        this.collection = new Collection();
        this.fetch().then(function () {
            this.render();
        }.bind(this));
    },

    fetch: function () {
        if (this.collection.isNew()) {
            return this.collection.fetch();
        }
    },

    render: function () {
        this.view = new View({
            collection: this.collection
        });
        this.container.show(this.view);
    }
});

},{"./collection":3,"./view":8,"core/module":"core/module"}],7:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<section>\n    <h3>Sample Chart</h3>\n    <button class=\"btn btn-primary\">refresh data</button>\n    <div class=\"horizontal-bar-graph\" id=\"graph\"></div>\n</section>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],8:[function(require,module,exports){
'use strict';

var ItemView = require('core/item-view');
var template = require('./template.hbs');
var _ = require('underscore');

var Graph = require('./graph');

module.exports = ItemView.extend({
    template: template,

    events: {
        'click button': 'reload'
    },

    onRender: function () {
        var graph = new Graph(
            this.el.querySelector('#graph'),
            _.chain(this.collection.toJSON())
                .sample(4)
                .value()
        );
        graph.draw();
    },

    reload: function () {
        this.render();
    }
});

},{"./graph":4,"./template.hbs":7,"core/item-view":"core/item-view","underscore":"underscore"}],9:[function(require,module,exports){
'use strict';

var Application = require('core/application');
var LayoutView = require('./view');

module.exports = Application.extend({
    initialize: function() {
        this.layout = new LayoutView();
        this.layout.render();
    }
});

},{"./view":11,"core/application":"core/application"}],10:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<main class=\"widget__content\" role=\"main\"></main>\n";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],11:[function(require,module,exports){
'use strict';

var LayoutView = require('core/layout-view');
var template = require('./template.hbs');

module.exports = LayoutView.extend({
    el: '.chart',
    template: template,

    regions: {
        content: '.widget__content'
    }
});

},{"./template.hbs":10,"core/layout-view":"core/layout-view"}]},{},[1])


//# sourceMappingURL=chart.js.map