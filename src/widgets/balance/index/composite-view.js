'use strict';

var CompositeView = require('core/composite-view');
var ItemNodeTemplate = require('./item-node-template.hbs');
var ItemLeafTemplate = require('./item-leaf-template.hbs');
var template = require('./composite-template.hbs');

var _ = require('underscore');

module.exports = CompositeView.extend({
    className: 'balance',
    template: template,

    initialize: function () {
        this.collection = this.model.nodes;
    },

    templateHelpers: function () {
        return {
            cid: _.uniqueId('collapse-')
        };
    },

    childViewContainer: '.panel-body:first',

    getTemplate: function() {
        if (_.isUndefined(this.collection)) {
            return ItemLeafTemplate;
        } else {
            return ItemNodeTemplate;
        }
    }
});
