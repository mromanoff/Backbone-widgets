'use strict';

var version = '__VERSION__';

require('./plugins');
var Backbone = require('backbone');

var Application = require('./application/application');

var app = new Application();

app.module('accounts', {
    moduleClass: require('./index/module'),
    container: app.layout.content
});

Backbone.history.start();
