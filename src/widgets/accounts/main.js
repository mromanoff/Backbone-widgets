'use strict';

var version = '__VERSION__';

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Widget = require('./widget/widget');
var widget = new Widget();

widget.module('accounts', {
    moduleClass: require('./index/module'),
    container: widget.layout.content
});

