(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var version = '1.0.1';

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

},{"./index/module":11,"./layout/module":12,"backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery"}],2:[function(require,module,exports){
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
    url: API.accounts,

    parse: function (response) {
        return _.sample(response, 4);
    }
});


},{"./model":10,"config/api":2,"core/collection":"core/collection","underscore":"underscore"}],4:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"container\">\n    <h3>Accounts</h3>\n    <div class=\"btn-group btn-group-sm\">\n        <button type=\"button\" data-view=\"grid\" class=\"btn btn-default\">\n            <span class=\"glyphicon glyphicon-th\"></span>\n        </button>\n        <button type=\"button\" data-view=\"list\" class=\"btn btn-default\">\n            <span class=\"glyphicon glyphicon-th-list\"></span>\n        </button>\n    </div>\n</div>\n<div class=\"container\">\n    <ul></ul>\n</div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],5:[function(require,module,exports){
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

},{"./composite-template.hbs":4,"./item-grid-view":7,"./item-list-view":9,"core/composite-view":"core/composite-view","jquery":"jquery"}],6:[function(require,module,exports){
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

},{"hbsfy/runtime":"hbsfy/runtime"}],7:[function(require,module,exports){
'use strict';

var ItemView = require('core/item-view');
var template = require('./item-grid-template.hbs');

module.exports = ItemView.extend({
    tagName: 'li',
    template: template,
    className: 'account account--grid-view'
});

},{"./item-grid-template.hbs":6,"core/item-view":"core/item-view"}],8:[function(require,module,exports){
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

},{"hbsfy/runtime":"hbsfy/runtime"}],9:[function(require,module,exports){
'use strict';

var ItemView = require('core/item-view');
var template = require('./item-list-template.hbs');

module.exports = ItemView.extend({
    tagName: 'li',
    template: template,
    className: 'account account--list-view'
});

},{"./item-list-template.hbs":8,"core/item-view":"core/item-view"}],10:[function(require,module,exports){
'use strict';

var Model = require('core/model');

module.exports = Model.extend({
    defaults: {
        accountName: null,
        allocationValue: null,
        allocationPercentage: null
    }
});


},{"core/model":"core/model"}],11:[function(require,module,exports){
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

},{"./collection":3,"./composite-view":5,"core/module":"core/module"}],12:[function(require,module,exports){
'use strict';

var Application = require('core/application');
var LayoutView = require('./view');

module.exports = Application.extend({
    initialize: function() {
        this.layout = new LayoutView();
        this.layout.render();
    }
});

},{"./view":14,"core/application":"core/application"}],13:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<main class=\"accounts__content\" role=\"main\"></main>\n";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],14:[function(require,module,exports){
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

},{"./template.hbs":13,"core/layout-view":"core/layout-view"}]},{},[1])


//# sourceMappingURL=accounts.js.map