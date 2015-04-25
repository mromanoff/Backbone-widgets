'use strict';

var Backbone = require('backbone');
Backbone.$ = require('jquery');


var Widget = require('./widget/widget');

var widget = new Widget();

widget.module('index', {
    moduleClass: require('./index/module'),
    container: widget.layout.content
});
