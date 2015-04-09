require('./plugins');
var Backbone = require('backbone');
var Application = require('./application/application');


var app = new Application();

app.module('accounts', {
    moduleClass: require('./accounts/module'),
    container: app.layout.content
});


Backbone.history.start();
