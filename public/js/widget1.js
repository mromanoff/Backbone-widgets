(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');

// start the marionette inspector
if (window.__agent) {
    window.__agent.start(Backbone, Marionette);
}




var myOptions = {
    test: 'test',
    name: 'Drew'
};

var Widget = Marionette.Application.extend({
    initialize: function (options) {
        //console.log('My container:', options.container);
    }
});

var widget = new Widget();


//widget.on('before:start', function (options) {
//    options.moreData = 'Yo dawg, I h{container: '.widget1'}eard you like options so I put some options in your options!';
//});
//
//widget.on('start', function (options) {
//    console.log('on start', options);
//});


var WidgetLayout = Marionette.LayoutView.extend({
    el: '.widget1',

    template: require('./layout-template.hbs'),

    regions: {
        content: '.widget__content'
    }
});

widget.layout = new WidgetLayout();
widget.layout.render();

//widget.addInitializer(function(options){
//
    var myView = new Marionette.ItemView({
        template: require('./item-view.hbs')
    });
    widget.layout.content.show(myView);
//});


widget.start(myOptions);

},{"./item-view.hbs":2,"./layout-template.hbs":3,"backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery"}],2:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h1>test widget</h1>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}],3:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<main class=\"widget__content\" role=\"main\"></main>";
},"useData":true});

},{"hbsfy/runtime":"hbsfy/runtime"}]},{},[1])


//# sourceMappingURL=widget1.js.map