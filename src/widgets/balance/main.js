'use strict';

//var version = '__VERSION__';

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
