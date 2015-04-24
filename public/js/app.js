(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var version = '0.0.1';

require('./plugins');
var Backbone = require('backbone');

var Application = require('./application/application');

var app = new Application();

app.module('accounts', {
    moduleClass: require('./index/module'),
    container: app.layout.content
});

Backbone.history.start();

},{"./application/application":2,"./index/module":13,"./plugins":16,"backbone":"backbone"}],2:[function(require,module,exports){
'use strict';

var Application = require('../../common/core/application');
var LayoutView = require('./layout-view');

module.exports = Application.extend({
    initialize: function() {
        this.layout = new LayoutView();
        this.layout.render();
    }
});

},{"../../common/core/application":18,"./layout-view":4}],3:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"application__header\"></div>\n<div class=\"application__flashes\"></div>\n<main class=\"application__content\" role=\"main\"></main>\n<div class=\"application__overlay\"></div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],4:[function(require,module,exports){
'use strict';

var LayoutView = require('../../common/core/layout-view');
var template = require('./layout-template.hbs');

module.exports = LayoutView.extend({
    el: '.application',
    template: template,

    regions: {
        header: '.application__header',
        flashes: '.application__flashes',
        content: '.application__content',
        overlay: '.application__overlay'
    }
});

},{"../../common/core/layout-view":22,"./layout-template.hbs":3}],5:[function(require,module,exports){
'use strict';

var Collection = require('../../common/core/collection');
var Model = require('./model');
var API = require('../../common/api-config');

module.exports = Collection.extend({
    url: API.accounts,
    model: Model,

    initialize: function () {
        console.log('collection', this.url);
    },

    parse: function (response) {
        return response;
    }
});


},{"../../common/api-config":17,"../../common/core/collection":19,"./model":12}],6:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"container\">\n    <h3>Accounts</h3>\n    <div class=\"btn-group btn-group-sm\">\n        <button type=\"button\" data-view=\"grid\" class=\"btn btn-default\">\n            <span class=\"glyphicon glyphicon-th\"></span>\n        </button>\n        <button type=\"button\" data-view=\"list\" class=\"btn btn-default\">\n            <span class=\"glyphicon glyphicon-th-list\"></span>\n        </button>\n    </div>\n</div>\n<div class=\"container\">\n    <ul></ul>\n</div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],7:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var CompositeView = require('../../common/core/composite-view');
var ItemGridView = require('./item-grid-view');
var ItemListView = require('./item-list-view');
var template = require('./composite-template.hbs');

module.exports = CompositeView.extend({
    className: 'accounts',
    template: template,
    events: {
        'click button': 'toggleView'
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

},{"../../common/core/composite-view":20,"./composite-template.hbs":6,"./item-grid-view":9,"./item-list-view":11,"jquery":"jquery"}],8:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"account__title\">"
    + alias3(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"accountName","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"account__allocation\">\n    <span class=\"title\">Today's total value</span>\n    <span class=\"value\">"
    + alias3(((helper = (helper = helpers.currencySymbol || (depth0 != null ? depth0.currencySymbol : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"currencySymbol","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.allocationValue || (depth0 != null ? depth0.allocationValue : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"allocationValue","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n<div class=\"account__chart\"></div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],9:[function(require,module,exports){
'use strict';

var ItemView = require('../../common/core/item-view');
var template = require('./item-grid-template.hbs');

module.exports = ItemView.extend({
    tagName: 'li',
    template: template,
    className: 'account account--grid-view'
});

},{"../../common/core/item-view":21,"./item-grid-template.hbs":8}],10:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"account__title\">"
    + alias3(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"accountName","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"account__chart\"></div>\n<div class=\"account__allocation\">\n    <span class=\"value\">"
    + alias3(((helper = (helper = helpers.allocationValue || (depth0 != null ? depth0.allocationValue : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"allocationValue","hash":{},"data":data}) : helper)))
    + "</span>\n    <span class=\"percentage\">"
    + alias3(((helper = (helper = helpers.allocationPercentage || (depth0 != null ? depth0.allocationPercentage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"allocationPercentage","hash":{},"data":data}) : helper)))
    + "</span>\n</div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],11:[function(require,module,exports){
'use strict';

var ItemView = require('../../common/core/item-view');
var template = require('./item-list-template.hbs');

module.exports = ItemView.extend({
    tagName: 'li',
    template: template,
    className: 'account account--list-view'
});

},{"../../common/core/item-view":21,"./item-list-template.hbs":10}],12:[function(require,module,exports){
'use strict';

var Model = require('../../common/core/model');

module.exports = Model.extend({
    defaults: {
        accountName: null,
        allocationValue: null,
        allocationPercentage: null
    },

    isActive: function() {
        return this.collection.active === this;
    }
});

},{"../../common/core/model":23}],13:[function(require,module,exports){
'use strict';

var Radio = require('backbone.radio');
var Module = require('../../common/core/module');
var Router = require('./router');

module.exports = Module.extend({
    initialize: function() {
        this.router = new Router(this.options);

        Radio.command('header', 'add', {
            name: 'Colors',
            path: 'colors',
            type: 'primary'
        });
    }
});

},{"../../common/core/module":24,"./router":15,"backbone.radio":"backbone.radio"}],14:[function(require,module,exports){
'use strict';

var Route = require('../../common/core/route');
var Collection = require('./collection');
var View = require('./composite-view');

module.exports = Route.extend({
    initialize: function(options) {
        this.container = options.container;
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

},{"../../common/core/route":25,"./collection":5,"./composite-view":7}],15:[function(require,module,exports){
'use strict';

var Router = require('../../common/core/router');
var IndexRoute = require('./route');

module.exports = Router.extend({
    initialize: function (options) {
        this.container = options.container;
    },

    routes: {
        '': 'index'
    },

    index: function () {
        return new IndexRoute({
            container: this.container
        });
    }
});

},{"../../common/core/router":26,"./route":14}],16:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');
//require('bootstrap');

// start the marionette inspector
if (window.__agent) {
    window.__agent.start(Backbone, Marionette);
}

},{"backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery"}],17:[function(require,module,exports){
'use strict';

var API = {
    accounts: '/api/accounts'
};

module.exports = API;



},{}],18:[function(require,module,exports){
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

},{"backbone.marionette":"backbone.marionette"}],19:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
    constructor: function() {
        Backbone.Collection.apply(this, arguments);
        this._isNew = true;
        this.once('sync', function() {
            this._isNew = false;
        });
    },

    isNew: function() {
        return this._isNew;
    }
});

},{"backbone":"backbone"}],20:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.CompositeView;

},{"backbone.marionette":"backbone.marionette"}],21:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView;

},{"backbone.marionette":"backbone.marionette"}],22:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView;

},{"backbone.marionette":"backbone.marionette"}],23:[function(require,module,exports){
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

},{"backbone":"backbone","backbone.radio":"backbone.radio"}],24:[function(require,module,exports){
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

},{"backbone":"backbone","backbone.marionette":"backbone.marionette"}],25:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Marionette.Object.extend({
    constructor: function () {
        this.initialize.apply(this, arguments);
    },

    enter: function (args) {
        var self = this;

        this.triggerMethod.apply(this, ['before:enter'].concat(args));
        this.triggerMethod.apply(this, ['before:fetch'].concat(args));

        return $.when(this.fetch.apply(this, args)).then(function () {
            self.triggerMethod.apply(self, ['fetch'].concat(args));
            self.triggerMethod.apply(self, ['before:render'].concat(args));
        }).then(function () {
            return self.render.apply(self, args);
        }).then(function () {
            self.triggerMethod.apply(self, ['render'].concat(args));
            self.triggerMethod.apply(self, ['enter'].concat(args));
        }).fail(function () {
            self.triggerMethod.apply(self, ['error'].concat(args));
        });
    },

    navigate: function () {
        Backbone.history.navigate.apply(Backbone.history, arguments);
    },

    fetch: function () {
    },
    render: function () {
    }
});

},{"backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery"}],26:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');
var Route = require('./route');

module.exports = Marionette.AppRouter.extend({
    constructor: function() {
        this.listenTo(Backbone.history, 'route', this._onHistoryRoute);
        Marionette.AppRouter.apply(this, arguments);
    },

    _onHistoryRoute: function(router) {
        if (this === router) {
            this.active = true;
        } else {
            this.active = false;
        }
    },

    execute: function(callback, args) {
        var self = this;

        if (!this.active) {
            this.triggerMethod.apply(this, ['before:enter'].concat(args));
        }

        this.triggerMethod.apply(this, ['before:route'].concat(args));

        $.when(this._execute(callback, args)).then(function() {
            if (!self.active) {
                self.triggerMethod.apply(self, ['enter'].concat(args));
            }

            self.triggerMethod.apply(self, ['route'].concat(args));
        });
    },

    _execute: function(callback, args) {
        var route = callback.apply(this, args);

        if (route instanceof Route) {
            return route.enter(args);
        }
    },

    triggerMethod: Marionette.triggerMethod
});

},{"./route":25,"backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery"}]},{},[1])


//# sourceMappingURL=app.js.map