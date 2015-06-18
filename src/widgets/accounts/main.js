'use strict';

//var version = '__VERSION__';

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
