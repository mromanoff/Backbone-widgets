'use strict';

var ItemView = require('core/item-view');
var template = require('./template.hbs');
var _ = require('underscore');

var Graph = require('./graph');

module.exports = ItemView.extend({
    template: template,

    events: {
        'click button': 'reload'
    },

    onRender: function () {
        var graph = new Graph(
            this.el.querySelector('#graph'),
            _.chain(this.collection.toJSON())
                .sample(4)
                .value()
        );
        graph.draw();
    },

    reload: function () {
        this.render();
    }
});
