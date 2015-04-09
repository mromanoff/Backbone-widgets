var $ = require('jquery');
var CompositeView = require('../common/composite-view');
var ItemView = require('./item-view');
var template = require('./composite-template.hbs');

module.exports = CompositeView.extend({

    template: template,
    className: 'accounts container grid-view',
    events: {
        'click button': 'toggleView'
    },

    initialize: function () {
        //this.collection = new App.Collections.Accounts();
        //this.collection.on('reset', this.render, this);
        //this.collection.fetch({reset: true});
    },

    childView: ItemView,
    childViewContainer: 'ul',

    collectionEvents: {
        'change': 'render'
    },

    toggleView: function (e) {
        e.preventDefault();
        this.layout = $(e.currentTarget).data('view');
        this.$el.toggleClass('list-view grid-view');
        this.$el.find('ul').empty();
        this.render();
    }
});