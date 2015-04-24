'use strict';

var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');
//require('bootstrap');

// start the marionette inspector
if (window.__agent) {
    window.__agent.start(Backbone, Marionette);
}
