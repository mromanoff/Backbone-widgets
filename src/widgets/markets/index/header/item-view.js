'use strict';

var ItemView = require('core/item-view');

var template = require('./item-template.hbs');


module.exports = ItemView.extend({
    template: template,
    tagName: 'li',

    events: {
        'click': 'changeMarket'
    },

    changeMarket: function (e) {
        e.preventDefault();
        console.log('change market view');
    }

});
