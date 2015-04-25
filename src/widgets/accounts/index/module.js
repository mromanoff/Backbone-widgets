'use strict';


var Module = require('../../../common/core/module');
var Collection = require('./collection');
var View = require('./composite-view');


module.exports = Module.extend({
    initialize: function() {
        this.container = this.options.container;
        var self = this;
        this.fetch().then(function () {
            self.render();
        });

    },

    fetch: function() {
        this.collection = new Collection();
        return this.collection.fetch();
    },

    render: function() {
        this.view = new View({
            collection: this.collection
        });
        this.container.show(this.view);
    }
});
