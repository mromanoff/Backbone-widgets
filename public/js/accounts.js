(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var version = '0.0.1';

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Widget = require('./widget/widget');
var widget = new Widget();

widget.module('accounts', {
    moduleClass: require('./index/module'),
    container: widget.layout.content
});


},{"./index/module":18,"./widget/widget":21,"backbone":"backbone","jquery":"jquery"}],2:[function(require,module,exports){
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

},{"backbone":"backbone"}],4:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.CompositeView;

},{"backbone.marionette":"backbone.marionette"}],5:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView;

},{"backbone.marionette":"backbone.marionette"}],6:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.LayoutView;

},{"backbone.marionette":"backbone.marionette"}],7:[function(require,module,exports){
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

},{"backbone":"backbone","backbone.radio":"backbone.radio"}],8:[function(require,module,exports){
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

},{"backbone":"backbone","backbone.marionette":"backbone.marionette"}],9:[function(require,module,exports){
'use strict';

var API = {
    accounts: '/api/accounts',
    widget1: '/api/widget'
};

module.exports = API;



},{}],10:[function(require,module,exports){
'use strict';

var Collection = require('../../../common/core/collection');
var Model = require('./model');
var API = require('../../../config/api-config');

module.exports = Collection.extend({
    model: Model,
    url: API.accounts,


    initialize: function () {
        console.log('collction', API.accounts);
    },

    parse: function (response) {
        return response;
    }
});


},{"../../../common/core/collection":3,"../../../config/api-config":9,"./model":17}],11:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"container\">\n    <h3>Accounts</h3>\n    <div class=\"btn-group btn-group-sm\">\n        <button type=\"button\" data-view=\"grid\" class=\"btn btn-default\">\n            <span class=\"glyphicon glyphicon-th\"></span>\n        </button>\n        <button type=\"button\" data-view=\"list\" class=\"btn btn-default\">\n            <span class=\"glyphicon glyphicon-th-list\"></span>\n        </button>\n    </div>\n</div>\n<div class=\"container\">\n    <ul></ul>\n</div>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],12:[function(require,module,exports){
'use strict';

var $ = require('jquery');
var CompositeView = require('../../../common/core/composite-view');
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

},{"../../../common/core/composite-view":4,"./composite-template.hbs":11,"./item-grid-view":14,"./item-list-view":16,"jquery":"jquery"}],13:[function(require,module,exports){
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

},{"hbsfy/runtime":"hbsfy/runtime"}],14:[function(require,module,exports){
'use strict';

var ItemView = require('../../../common/core/item-view');
var template = require('./item-grid-template.hbs');

module.exports = ItemView.extend({
    tagName: 'li',
    template: template,
    className: 'account account--grid-view'
});

},{"../../../common/core/item-view":5,"./item-grid-template.hbs":13}],15:[function(require,module,exports){
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

},{"hbsfy/runtime":"hbsfy/runtime"}],16:[function(require,module,exports){
'use strict';

var ItemView = require('../../../common/core/item-view');
var template = require('./item-list-template.hbs');

module.exports = ItemView.extend({
    tagName: 'li',
    template: template,
    className: 'account account--list-view'
});

},{"../../../common/core/item-view":5,"./item-list-template.hbs":15}],17:[function(require,module,exports){
'use strict';

var Model = require('../../../common/core/model');

module.exports = Model.extend({
    defaults: {
        accountName: null,
        allocationValue: null,
        allocationPercentage: null
    }
});


},{"../../../common/core/model":7}],18:[function(require,module,exports){
'use strict';


var Module = require('../../../common/core/module');
var Collection = require('./collection');
var View = require('./composite-view');


module.exports = Module.extend({
    initialize: function() {
        this.container = this.options.container;
        var self = this;
        this.fetch().then(function () {
            self.render();
        });

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

},{"../../../common/core/module":8,"./collection":10,"./composite-view":12}],19:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<main class=\"widget2__content\" role=\"main\"></main>\n";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],20:[function(require,module,exports){
'use strict';

var LayoutView = require('../../../common/core/layout-view');
var template = require('./layout-template.hbs');

module.exports = LayoutView.extend({
    el: '.widget2',
    template: template,

    regions: {
        content: '.widget2__content'
    }
});

},{"../../../common/core/layout-view":6,"./layout-template.hbs":19}],21:[function(require,module,exports){
'use strict';

var Application = require('../../../common/core/application');
var LayoutView = require('./layout-view');

module.exports = Application.extend({
    initialize: function() {
        this.layout = new LayoutView();
        this.layout.render();
    }
});

},{"../../../common/core/application":2,"./layout-view":20}]},{},[1])


//# sourceMappingURL=accounts.js.map