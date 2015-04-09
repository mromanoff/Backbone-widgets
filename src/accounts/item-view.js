var ItemView = require('../common/item-view');
var template = require('./item-template.hbs');

module.exports = ItemView.extend({
    tagName: 'li',
    template: template,
    className: 'account account__item',

    initialize: function (options) {
        this.layout = options.layout;
    },

    attributes: function () {
        return {
            href: '#colors/' + this.model.get('id')
        };
    },

    modelEvents: {
        'all': 'render'
    }
});