(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//var version = '1.0.1';

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Marionette = require('backbone.marionette');

var Widget = require('./layout/module');
var widget = new Widget();

widget.module('accounts', {
    moduleClass: require('./index/module'),
    container: widget.layout.content
});

// start the marionette inspector
if (window.__agent) {
    window.__agent.start(Backbone, Marionette);
}

},{"./index/module":12,"./layout/module":13,"backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery"}],2:[function(require,module,exports){
'use strict';

var API = {
    accounts: '/api/accounts',
    persona: '/api/persona',
    charts: '/api/charts'
};

module.exports = API;



},{}],3:[function(require,module,exports){
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
        console.info(this.el, this.series);

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

},{"d3":"d3"}],4:[function(require,module,exports){
'use strict';

var Collection = require('core/collection');
var Model = require('./model');
var API = require('config/api');
var _ = require('underscore');

module.exports = Collection.extend({
    model: Model,
    url: API.accounts,

    parse: function (response) {
        return _.sample(response, 4);
    }
});


},{"./model":11,"config/api":2,"core/collection":"core/collection","underscore":"underscore"}],5:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"container\">\n    <h3>Accounts</h3>\n    <div class=\"btn-group btn-group-sm\">\n        <button type=\"button\" data-view=\"grid\" class=\"btn btn-default\">\n            <span class=\"glyphicon glyphicon-th\"></span>\n        </button>\n        <button type=\"button\" data-view=\"list\" class=\"btn btn-default\">\n            <span class=\"glyphicon glyphicon-th-list\"></span>\n        </button>\n    </div>\n</div>\n<div class=\"container\">\n    <ul></ul>\n</div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],6:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var CompositeView = require('core/composite-view');
var ItemGridView = require('./item-grid-view');
var ItemListView = require('./item-list-view');
var template = require('./composite-template.hbs');

module.exports = CompositeView.extend({
    className: 'accounts',
    template: template,
    events: {
        'click button': 'toggleView'
    },

    initialize: function () {

    },

    childViewContainer: 'ul',

    getChildView: function () {
        return (this.layout === 'list') ? ItemListView : ItemGridView;
    },

    toggleView: function (e) {
        e.preventDefault();
        this.layout = $(e.currentTarget).data('view');
        this.render();
    }
});

},{"./composite-template.hbs":5,"./item-grid-view":8,"./item-list-view":10,"core/composite-view":"core/composite-view","jquery":"jquery"}],7:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"account__title\">"
    + alias3(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"accountName","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"account__allocation\">\n    <span class=\"title\">Today's total value</span>\n    <span class=\"value\">"
    + alias3(((helper = (helper = helpers.currencySymbol || (depth0 != null ? depth0.currencySymbol : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"currencySymbol","hash":{},"data":data}) : helper)))
    + alias3(((helper = (helper = helpers.allocationValue || (depth0 != null ? depth0.allocationValue : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"allocationValue","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n<div class=\"account__chart\"></div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],8:[function(require,module,exports){
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

},{"./chart":3,"./item-grid-template.hbs":7,"core/item-view":"core/item-view"}],9:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"account__title\">"
    + alias3(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"accountName","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"account__chart\"></div>\n<div class=\"account__allocation\">\n    <span class=\"value\">"
    + alias3(((helper = (helper = helpers.currencySymbol || (depth0 != null ? depth0.currencySymbol : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"currencySymbol","hash":{},"data":data}) : helper)))
    + alias3(((helper = (helper = helpers.allocationValue || (depth0 != null ? depth0.allocationValue : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"allocationValue","hash":{},"data":data}) : helper)))
    + "</span>\n    <span class=\"percentage\">"
    + alias3(((helper = (helper = helpers.allocationPercentage || (depth0 != null ? depth0.allocationPercentage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"allocationPercentage","hash":{},"data":data}) : helper)))
    + "%</span>\n</div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],10:[function(require,module,exports){
'use strict';

var ItemView = require('core/item-view');
var template = require('./item-list-template.hbs');

var Chart = require('./chart');

module.exports = ItemView.extend({
    tagName: 'li',
    template: template,
    className: 'account account--list-view',

    initialize: function () {
        this.series = this.model.toJSON().series;
    },

    onShow: function () {
        var chart = new Chart(this.el.querySelector('.account__chart'), this.series);
        chart.init();
    }
});

},{"./chart":3,"./item-list-template.hbs":9,"core/item-view":"core/item-view"}],11:[function(require,module,exports){
'use strict';

var Model = require('core/model');

module.exports = Model.extend({
    defaults: {
        accountName: null,
        allocationValue: null,
        allocationPercentage: null
    }
});


},{"core/model":"core/model"}],12:[function(require,module,exports){
'use strict';


var Module = require('core/module');
var Collection = require('./collection');
var View = require('./composite-view');


module.exports = Module.extend({
    initialize: function() {
        this.container = this.options.container;
        this.fetch().then(function () {
            this.render();
        }.bind(this));

    },

    fetch: function() {
        this.collection = new Collection();
        return this.collection.fetch();
    },

    render: function() {
        this.view = new View({
            collection: this.collection
        });
        this.container.show(this.view);
    }
});

},{"./collection":4,"./composite-view":6,"core/module":"core/module"}],13:[function(require,module,exports){
'use strict';

var Application = require('core/application');
var LayoutView = require('./view');

module.exports = Application.extend({
    initialize: function() {
        this.layout = new LayoutView();
        this.layout.render();
    }
});

},{"./view":15,"core/application":"core/application"}],14:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<main class=\"accounts__content\" role=\"main\"></main>\n";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],15:[function(require,module,exports){
'use strict';

var LayoutView = require('core/layout-view');
var template = require('./template.hbs');

module.exports = LayoutView.extend({
    el: '.accounts',
    template: template,

    regions: {
        content: '.accounts__content'
    }
});

},{"./template.hbs":14,"core/layout-view":"core/layout-view"}]},{},[1])


//# sourceMappingURL=accounts.js.map