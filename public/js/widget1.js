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

},{"./index/module":4,"./layout/module":7,"backbone":"backbone","jquery":"jquery"}],2:[function(require,module,exports){
'use strict';

var API = {
    accounts: '/api/accounts',
    widget1: '/api/widget',
    charts: 'api/charts'
};

module.exports = API;



},{}],3:[function(require,module,exports){
'use strict';

var Model = require('core/model');
var API = require('config/api');

module.exports = Model.extend({
    defaults: {
        firstName: null,
        lastName: null,
        avatar: null,
        telephone: null
    },
    url: API.widget1
});

},{"config/api":2,"core/model":"core/model"}],4:[function(require,module,exports){
'use strict';

var Module = require('core/module');
var Model = require('./model');
var View = require('./view');

module.exports = Module.extend({
    initialize: function() {
        this.container = this.options.container;

        this.fetch().then(function () {
            this.render();
        }.bind(this));
    },

    fetch: function() {
        this.model = new Model();
        return this.model.fetch();
    },

    render: function() {
        this.view = new View({
            model: this.model
        });
        this.container.show(this.view);
    }
});

},{"./model":3,"./view":6,"core/module":"core/module"}],5:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "<section>\n    <h3>Widget 1</h3>\n\n    <div>\n        <div>\n            <h4>User name</h4>\n            <div>"
    + alias2((helpers.upcase || (depth0 && depth0.upcase) || alias1).call(depth0,(depth0 != null ? depth0.firstName : depth0),{"name":"upcase","hash":{},"data":data}))
    + " "
    + alias2((helpers.upcase || (depth0 && depth0.upcase) || alias1).call(depth0,(depth0 != null ? depth0.lastName : depth0),{"name":"upcase","hash":{},"data":data}))
    + "</div>\n        </div>\n        <div>\n            <h4>Avatar</h4>\n            <div><img src=\""
    + alias2(((helper = (helper = helpers.avatar || (depth0 != null ? depth0.avatar : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"avatar","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias2(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"firstName","hash":{},"data":data}) : helper)))
    + " "
    + alias2(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "\"></div>\n        </div>\n        <div>\n            <h4>Telephone</h4>\n            <div>"
    + alias2(((helper = (helper = helpers.telephone || (depth0 != null ? depth0.telephone : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"telephone","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n    </div>\n</section>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],6:[function(require,module,exports){
'use strict';

var ItemView = require('core/item-view');
var template = require('./template.hbs');

module.exports = ItemView.extend({
    template: template
});

},{"./template.hbs":5,"core/item-view":"core/item-view"}],7:[function(require,module,exports){
'use strict';

var Application = require('core/application');
var LayoutView = require('./view');

module.exports = Application.extend({
    initialize: function() {
        this.layout = new LayoutView();
        this.layout.render();
    }
});

},{"./view":9,"core/application":"core/application"}],8:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<main class=\"widget1__content\" role=\"main\"></main>\n";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],9:[function(require,module,exports){
'use strict';

var LayoutView = require('core/layout-view');
var template = require('./template.hbs');

module.exports = LayoutView.extend({
    el: '.widget1',
    template: template,

    regions: {
        content: '.widget1__content'
    }
});

},{"./template.hbs":8,"core/layout-view":"core/layout-view"}]},{},[1])


//# sourceMappingURL=widget1.js.map