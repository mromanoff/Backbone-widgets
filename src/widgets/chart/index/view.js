'use strict';

var ItemView = require('core/item-view');
var template = require('./template.hbs');

var Graph = require('./graph');

module.exports = ItemView.extend({
    template: template,

    events: {
        'click button': 'reload'
    },

    onRender: function () {
        var graph = new Graph(
            this.el.querySelector('#graph'),
            this.collection.toJSON()
        );
        graph.draw();
    },

    reload: function () {
        this.collection.fetch();
        this.render();
    }
});
