(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');

// start the marionette inspector
if (window.__agent) {
    window.__agent.start(Backbone, Marionette);
}


var Widget = Marionette.Application.extend();

var widget = new Widget();

var WidgetLayout = Marionette.LayoutView.extend({
    el: '.widget2',
    template: require('./layout-template.hbs'),
    regions: {
        content: '.widget__content'
    }
});

widget.layout = new WidgetLayout();
widget.layout.render();

var myView = new Marionette.ItemView({
    template: require('./item-view.hbs')
});
widget.layout.content.show(myView);

widget.start();

},{"./item-view.hbs":2,"./layout-template.hbs":3,"backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery"}],2:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h1>test widget 2</h1>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],3:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<main class=\"widget__content\" role=\"main\"></main>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}]},{},[1])


//# sourceMappingURL=widget2.js.map