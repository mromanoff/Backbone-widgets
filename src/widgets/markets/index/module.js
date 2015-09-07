'use strict';

var Module = require('core/module');
var Collection = require('core/collection');

var Model = require('./model');
var LayoutView = require('./layout-view');

var HeaderView = require('./header/composite-view');
var HeaderCollection = require('./header/collection');

var MarketLayout = require('./market/layout-view');
var MarketCollection = require('./market/collection');


module.exports = Module.extend({
    initialize: function () {
        this.container = this.options.container;

        this.layout = new LayoutView();
        this.container.show(this.layout);

        this.model = new Model();
        this.fetch().then(function () {
            this.render();
        }.bind(this));
    },

    fetch: function () {
        return this.model.fetch();
    },

    render: function () {
        this.headerCollection = new HeaderCollection(this.model.toJSON().options);
        this.headerCollection.active = this.headerCollection.first();  //TODO:MR first or default
        this.headerView = new HeaderView({
            collection: this.headerCollection,
            model: this.model
        });

        this.marketCollection = new MarketCollection(this.model.toJSON().markets);
        this.marketCollection.active = this.marketCollection.first();  //TODO:MR first or default
        this.marketLayout = new MarketLayout({
            collection: this.marketCollection
        });

        this.layout.header.show(this.headerView);
        this.layout.market.show(this.marketLayout);
    }
});
