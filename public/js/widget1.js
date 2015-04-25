(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
Backbone.$ = require('jquery');


var Widget = require('./widget/widget');

var widget = new Widget();

widget.module('index', {
    moduleClass: require('./index/module'),
    container: widget.layout.content
});

},{"./index/module":9,"./widget/widget":14,"backbone":"backbone","jquery":"jquery"}],2:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.Application.extend({
    // Polyfill for:
    // https://github.com/marionettejs/backbone.marionette/pull/1723
    constructor: function() {
        Marionette.Application.apply(this, arguments);
        this.initialize.apply(this, arguments);
    }
});

},{"backbone.marionette":"backbone.marionette"}],3:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView;

},{"backbone.marionette":"backbone.marionette"}],4:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView;

},{"backbone.marionette":"backbone.marionette"}],5:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
var Radio = require('backbone.radio');

var flashesChannel = Radio.channel('flashes');

module.exports = Backbone.Model.extend({
    constructor: function () {
        Backbone.Model.apply(this, arguments);
        this.on('request', this.handleRequest);
        this.on('error', this.handleError);
    },

    handleRequest: function () {
        flashesChannel.command('remove', this.serverError);
        delete this.serverError;
    },

    handleError: function () {
        this.serverError = {type: 'danger', title: 'Server Error'};
        flashesChannel.command('add', this.serverError);
    },

    cleanup: function () {
        if (this.serverError) {
            flashesChannel.command('remove', this.serverError);
        }
        delete this.serverError;
        delete this.validationError;
    }
});

},{"backbone":"backbone","backbone.radio":"backbone.radio"}],6:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');
var Backbone = require('backbone');

module.exports = Marionette.Module.extend({
    constructor: function() {
        this.listenTo(Backbone.history, 'route', this._onHistoryRoute);
        Marionette.Module.apply(this, arguments);
    },

    initialize: function() {},

    _onHistoryRoute: function(router) {
        if (!this.router) {
            return;
        }

        if (this.router && this.router === router) {
            this.start();
        } else {
            this.stop();
        }
    }
});

},{"backbone":"backbone","backbone.marionette":"backbone.marionette"}],7:[function(require,module,exports){
'use strict';

var API = {
    accounts: '/api/accounts',
    widget1: '/api/widget'
};

module.exports = API;



},{}],8:[function(require,module,exports){
'use strict';

var Model = require('../../../common/core/model');
var API = require('../../../config/api-config');

module.exports = Model.extend({
    defaults: {
        accountName: null,
        allocationValue: null,
        currencySymbol: null,
        allocationPercentage: null
    },
    url: API.widget1
});

},{"../../../common/core/model":5,"../../../config/api-config":7}],9:[function(require,module,exports){
'use strict';


var Module = require('../../../common/core/module');
var Model = require('./model');
var View = require('./view');

module.exports = Module.extend({
    initialize: function() {
        this.container = this.options.container;
        var self = this;
        this.fetch().then(function () {
            self.render();
        });

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

},{"../../../common/core/module":6,"./model":8,"./view":11}],10:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<section class=\"widget container\">\n    <h3>Widget 1</h3>\n\n    <div>\n        <div>\n            <h4>"
    + alias3(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"accountName","hash":{},"data":data}) : helper)))
    + "</h4>\n            <div>"
    + alias3(((helper = (helper = helpers.allocationValue || (depth0 != null ? depth0.allocationValue : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"allocationValue","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n        <div>\n            <h4>"
    + alias3(((helper = (helper = helpers.currencySymbol || (depth0 != null ? depth0.currencySymbol : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"currencySymbol","hash":{},"data":data}) : helper)))
    + "</h4>\n            <div>"
    + alias3(((helper = (helper = helpers.allocationPercentage || (depth0 != null ? depth0.allocationPercentage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"allocationPercentage","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n        <div>\n            <h4>Title</h4>\n            <div>Text</div>\n        </div>\n    </div>\n</section>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],11:[function(require,module,exports){
'use strict';

var ItemView = require('../../../common/core/item-view');
var template = require('./template.hbs');

module.exports = ItemView.extend({
    template: template,
    className: 'widget'
});

},{"../../../common/core/item-view":3,"./template.hbs":10}],12:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<main class=\"widget__content\" role=\"main\"></main>\n";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],13:[function(require,module,exports){
'use strict';

var LayoutView = require('../../../common/core/layout-view');
var template = require('./layout-template.hbs');

module.exports = LayoutView.extend({
    el: '.widget1',
    template: template,

    regions: {
        content: '.widget__content'
    }
});

},{"../../../common/core/layout-view":4,"./layout-template.hbs":12}],14:[function(require,module,exports){
'use strict';

var Application = require('../../../common/core/application');
var LayoutView = require('./layout-view');

module.exports = Application.extend({
    initialize: function() {
        this.layout = new LayoutView();
        this.layout.render();
    }
});

},{"../../../common/core/application":2,"./layout-view":13}]},{},[1])


//# sourceMappingURL=widget1.js.map