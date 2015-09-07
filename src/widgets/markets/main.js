'use strict';

window.$ = window.jQuery = require('jquery');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

require('bootstrap');


var Widget = require('./layout/module');

var widget = new Widget();

widget.module('index', {
    moduleClass: require('./index/module'),
    container: widget.layout.content
});
