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
