(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.$ = window.jQuery = require('jquery');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

require('bootstrap');


var Widget = require('./layout/module');

var widget = new Widget();

widget.module('index', {
    moduleClass: require('./index/module'),
    container: widget.layout.content
});

},{"./index/module":23,"./layout/module":24,"backbone":"backbone","bootstrap":"bootstrap","jquery":"jquery"}],2:[function(require,module,exports){
'use strict';

var API = {
    accounts: '/api/accounts',
    persona: '/api/persona',
    charts: '/api/charts',
    balance: '/api/balance',
    markets: 'api/markets'
};

module.exports = API;



},{}],3:[function(require,module,exports){
'use strict';

var Collection = require('core/collection');
var Model = require('./model');

module.exports = Collection.extend({
    model: Model
});


},{"./model":8,"core/collection":"core/collection"}],4:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<h2>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n<span><a href=\"#\">view all</a></span>\n\n<div class=\"dropdown dropdown pull-right\">\n    <button class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">\n        "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n        <span class=\"caret\"></span>\n    </button>\n    <ul class=\"dropdown-menu\"></ul>\n</div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],5:[function(require,module,exports){
'use strict';

var CompositeView = require('core/composite-view');

var template = require('./composite-template.hbs');
var ItemView = require('./item-view');

module.exports = CompositeView.extend({
    template: template,
    childViewContainer: 'ul',
    childView: ItemView
});

},{"./composite-template.hbs":4,"./item-view":7,"core/composite-view":"core/composite-view"}],6:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<a href=\"#\">"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],7:[function(require,module,exports){
'use strict';

var ItemView = require('core/item-view');

var template = require('./item-template.hbs');


module.exports = ItemView.extend({
    template: template,
    tagName: 'li',

    events: {
        'click': 'changeMarket'
    },

    changeMarket: function (e) {
        e.preventDefault();
        console.log('change market view');
    }

});

},{"./item-template.hbs":6,"core/item-view":"core/item-view"}],8:[function(require,module,exports){
'use strict';

var Model = require('core/model');

module.exports = Model.extend({
    defaults: {
        name: null
    },

    isActive: function () {
        return this.collection.active === this;
    }
});



},{"core/model":"core/model"}],9:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h3>Markets</h3>\n<div class=\"row header\"></div>\n<div class=\"row market\"></div>\n";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],10:[function(require,module,exports){
'use strict';

var ItemView = require('core/layout-view');
var template = require('./layout-template.hbs');

module.exports = ItemView.extend({
    template: template,

    regions: {
        header: '.header',
        market: '.market'
    }
});

},{"./layout-template.hbs":9,"core/layout-view":"core/layout-view"}],11:[function(require,module,exports){
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

},{"d3":"d3"}],12:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div>"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"chart\"></div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],13:[function(require,module,exports){
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


},{"./chart":11,"./template.hbs":12,"core/item-view":"core/item-view"}],14:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"./model":21,"core/collection":"core/collection","dup":3}],15:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"col-md-6 list\"></div>\n<div class=\"col-md-6 chart\"></div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],16:[function(require,module,exports){
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
        this.listenTo(this.collection, 'active', this.rerenderViews);

        this.listView = new ListView({
            collection: this.collection
        });

        this.chartView = new ChartView({
            model: this.collection.active
        });
    },

    rerenderViews: function () {
        this.listView = new ListView({
            collection: this.collection
        });

        this.chartView = new ChartView({
            collection: this.collection,
            model: this.collection.active
        });

        this.list.show(this.listView);
        this.chart.show(this.chartView);
    },


    onAttach: function () {
        this.list.show(this.listView);
        this.chart.show(this.chartView);
    }
});

},{"./chart/view":13,"./layout-template.hbs":15,"./list/composite-view":18,"core/layout-view":"core/layout-view"}],17:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"index\">Index</div>\n<div class=\"value\">Value</div>\n<div class=\"change\">Change</div>\n<div class=\"list-group\"></div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],18:[function(require,module,exports){
'use strict';

var CompositeView = require('core/composite-view');
var template = require('./composite-template.hbs');
var ItemView = require('./item-view');

module.exports = CompositeView.extend({
    template: template,
    childView: ItemView,
    childViewContainer: '.list-group',

    initialize: function () {
        //this.listenTo(this.collection, 'active', this.render);
    }
});

},{"./composite-template.hbs":17,"./item-view":20,"core/composite-view":"core/composite-view"}],19:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"index\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"value\">"
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"change\">"
    + alias3(((helper = (helper = helpers.change || (depth0 != null ? depth0.change : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"change","hash":{},"data":data}) : helper)))
    + "</div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],20:[function(require,module,exports){
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


},{"./item-template.hbs":19,"core/item-view":"core/item-view"}],21:[function(require,module,exports){
'use strict';

var Model = require('core/model');

module.exports = Model.extend({
    defaults: {
        change: null,
        data: [],
        name: null,
        value: null
    },

    isActive: function () {
        return this.collection.active === this;
    }
});



},{"core/model":"core/model"}],22:[function(require,module,exports){
'use strict';

var Model = require('core/model');
var API = require('config/api').markets;

module.exports = Model.extend({
    defaults: {},
    url: API
});



},{"config/api":2,"core/model":"core/model"}],23:[function(require,module,exports){
'use strict';

var Module = require('core/module');
var Collection = require('core/collection');

var Model = require('./model');
var LayoutView = require('./layout-view');

var HeaderView = require('./header/composite-view');
var HeaderCollection = require('./header/collection');

var MarketLayout = require('./market/layout-view');
var MarketCollection = require('./market/collection');


module.exports = Module.extend({
    initialize: function () {
        this.container = this.options.container;

        this.layout = new LayoutView();
        this.container.show(this.layout);

        this.model = new Model();
        this.fetch().then(function () {
            this.render();
        }.bind(this));
    },

    fetch: function () {
        return this.model.fetch();
    },

    render: function () {
        this.headerCollection = new HeaderCollection(this.model.toJSON().options);
        this.headerCollection.active = this.headerCollection.first();  //TODO:MR first or default
        this.headerView = new HeaderView({
            collection: this.headerCollection,
            model: this.model
        });

        this.marketCollection = new MarketCollection(this.model.toJSON().markets);
        this.marketCollection.active = this.marketCollection.first();  //TODO:MR first or default
        this.marketLayout = new MarketLayout({
            collection: this.marketCollection
        });

        this.layout.header.show(this.headerView);
        this.layout.market.show(this.marketLayout);
    }
});

},{"./header/collection":3,"./header/composite-view":5,"./layout-view":10,"./market/collection":14,"./market/layout-view":16,"./model":22,"core/collection":"core/collection","core/module":"core/module"}],24:[function(require,module,exports){
'use strict';

var Application = require('core/application');
var LayoutView = require('./view');

module.exports = Application.extend({
    initialize: function() {
        this.layout = new LayoutView();
        this.layout.render();
    }
});

},{"./view":26,"core/application":"core/application"}],25:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<main class=\"widget__content\" role=\"main\"></main>\n";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],26:[function(require,module,exports){
'use strict';

var LayoutView = require('core/layout-view');
var template = require('./template.hbs');

module.exports = LayoutView.extend({
    el: '.markets',
    template: template,

    regions: {
        content: '.widget__content'
    }
});

},{"./template.hbs":25,"core/layout-view":"core/layout-view"}]},{},[1])


//# sourceMappingURL=markets.js.map