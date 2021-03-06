'use strict';

var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');
var Route = require('./route');

module.exports = Marionette.AppRouter.extend({
    constructor: function() {
        this.listenTo(Backbone.history, 'route', this._onHistoryRoute);
        Marionette.AppRouter.apply(this, arguments);
    },

    _onHistoryRoute: function(router) {
        if (this === router) {
            this.active = true;
        } else {
            this.active = false;
        }
    },

    execute: function(callback, args) {
        var self = this;

        if (!this.active) {
            this.triggerMethod.apply(this, ['before:enter'].concat(args));
        }

        this.triggerMethod.apply(this, ['before:route'].concat(args));

        $.when(this._execute(callback, args)).then(function() {
            if (!self.active) {
                self.triggerMethod.apply(self, ['enter'].concat(args));
            }

            self.triggerMethod.apply(self, ['route'].concat(args));
        });
    },

    _execute: function(callback, args) {
        var route = callback.apply(this, args);

        if (route instanceof Route) {
            return route.enter(args);
        }
    },

    triggerMethod: Marionette.triggerMethod
});
