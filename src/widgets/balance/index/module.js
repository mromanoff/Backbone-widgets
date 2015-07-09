'use strict';


var Module = require('core/module');
var Collection = require('./collection');
var View = require('./collection-view');


module.exports = Module.extend({
    initialize: function() {
        this.container = this.options.container;
        this.fetch().then(function () {
            this.render();
        }.bind(this));

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
