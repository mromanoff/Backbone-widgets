(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//var version = '1.0.1';

window.$ = window.jQuery = require('jquery');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

require('bootstrap');

var Marionette = require('backbone.marionette');

var Widget = require('./layout/module');
var widget = new Widget();

widget.module('index', {
    moduleClass: require('./index/module'),
    container: widget.layout.content
});

// start the marionette inspector
if (window.__agent) {
    window.__agent.start(Backbone, Marionette);
}

},{"./index/module":10,"./layout/module":11,"backbone":"backbone","backbone.marionette":"backbone.marionette","bootstrap":"bootstrap","jquery":"jquery"}],2:[function(require,module,exports){
'use strict';

var API = {
    accounts: '/api/accounts',
    persona: '/api/persona',
    charts: '/api/charts',
    balance: '/api/balance'
};

module.exports = API;



},{}],3:[function(require,module,exports){
'use strict';

var CollectionView = require('core/collection-view');
var CompositeView = require('./composite-view');

module.exports = CollectionView.extend({
    childView: CompositeView
});

},{"./composite-view":6,"core/collection-view":"core/collection-view"}],4:[function(require,module,exports){
'use strict';

var Collection = require('core/collection');
var API = require('config/api');

var Model = require('./model');

module.exports = Collection.extend({
    model: Model,
    url: API.balance
});


},{"./model":9,"config/api":2,"core/collection":"core/collection"}],5:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"container\">\n    <h3>Balance</h3>\n</div>\n<div class=\"container\">\n    <div class=\"panel-group\" id=\"accordion\"></div>\n</div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],6:[function(require,module,exports){
'use strict';

var CompositeView = require('core/composite-view');
var ItemNodeTemplate = require('./item-node-template.hbs');
var ItemLeafTemplate = require('./item-leaf-template.hbs');
var template = require('./composite-template.hbs');

var _ = require('underscore');

module.exports = CompositeView.extend({
    className: 'balance',
    template: template,

    initialize: function () {
        this.collection = this.model.nodes;
    },

    templateHelpers: function () {
        return {
            cid: _.uniqueId('collapse-')
        };
    },

    childViewContainer: '.panel-body:first',

    getTemplate: function() {
        if (_.isUndefined(this.collection)) {
            return ItemLeafTemplate;
        } else {
            return ItemNodeTemplate;
        }
    }
});

},{"./composite-template.hbs":5,"./item-leaf-template.hbs":7,"./item-node-template.hbs":8,"core/composite-view":"core/composite-view","underscore":"underscore"}],7:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"panel\">\n    <div class=\"panel-heading\">\n        <h4 class=\"panel-title\">\n            "
    + this.escapeExpression(((helper = (helper = helpers.nodeName || (depth0 != null ? depth0.nodeName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"nodeName","hash":{},"data":data}) : helper)))
    + "\n        </h4>\n    </div>\n</div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],8:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n        <h4 class=\"panel-title\">\n            <a role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#"
    + alias3(((helper = (helper = helpers.cid || (depth0 != null ? depth0.cid : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cid","hash":{},"data":data}) : helper)))
    + "\">\n                "
    + alias3(((helper = (helper = helpers.nodeName || (depth0 != null ? depth0.nodeName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nodeName","hash":{},"data":data}) : helper)))
    + "\n            </a>\n        </h4>\n    </div>\n    <div id=\""
    + alias3(((helper = (helper = helpers.cid || (depth0 != null ? depth0.cid : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cid","hash":{},"data":data}) : helper)))
    + "\" class=\"panel-collapse collapse\">\n        <div class=\"panel-body\"></div>\n    </div>\n</div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],9:[function(require,module,exports){
'use strict';

var Model = require('core/model');

module.exports = Model.extend({
    defaults: {},

    initialize: function () {
        var nodes = this.get('nodes');
        if (nodes) {
            // include here. avoid circular dependency
            var Collection = require('./collection');
            this.nodes = new Collection(nodes);
            this.unset('nodes');
        }
    }
});


},{"./collection":4,"core/model":"core/model"}],10:[function(require,module,exports){
'use strict';


var Module = require('core/module');
var Collection = require('./collection');
var View = require('./collection-view');


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

},{"./collection":4,"./collection-view":3,"core/module":"core/module"}],11:[function(require,module,exports){
'use strict';

var Application = require('core/application');
var LayoutView = require('./view');

module.exports = Application.extend({
    initialize: function() {
        this.layout = new LayoutView();
        this.layout.render();
    }
});

},{"./view":13,"core/application":"core/application"}],12:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<main class=\"balance__content\" role=\"main\"></main>\n";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],13:[function(require,module,exports){
'use strict';

var LayoutView = require('core/layout-view');
var template = require('./template.hbs');

module.exports = LayoutView.extend({
    el: '.balance',
    template: template,

    regions: {
        content: '.balance__content'
    }
});

},{"./template.hbs":12,"core/layout-view":"core/layout-view"}]},{},[1])


//# sourceMappingURL=balance.js.map