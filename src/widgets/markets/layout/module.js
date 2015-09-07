'use strict';

var Application = require('core/application');
var LayoutView = require('./view');

module.exports = Application.extend({
    initialize: function() {
        this.layout = new LayoutView();
        this.layout.render();
    }
});
