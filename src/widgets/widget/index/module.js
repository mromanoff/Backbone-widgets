'use strict';

var Module = require('core/module');
var Model = require('./model');
var View = require('./view');

module.exports = Module.extend({
    initialize: function() {
        this.container = this.options.container;

        this.fetch().then(function () {
            this.render();
        }.bind(this));
    },

    fetch: function() {
        this.model = new Model();
        return this.model.fetch();
    },

    render: function() {
        this.view = new View({
            model: this.model
        });
        this.container.show(this.view);
    }
});
