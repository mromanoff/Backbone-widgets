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
