require('require-xml');
var Backbone = require('backbone');

var fixture = require('./fixture.xml');
var model = new Backbone.Model(JSON.parse(fixture));

module.exports = function(api) {
    api.route('/api/site-navigation')
        .get(function(req, res) {
            res.json(model);
        });
};
