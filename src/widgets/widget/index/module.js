'use strict';


var Module = require('../../../common/core/module');
var Model = require('./model');
var View = require('./view');

module.exports = Module.extend({
    initialize: function() {
        this.container = this.options.container;
        var self = this;
        this.fetch().then(function () {
            self.render();
        });

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
