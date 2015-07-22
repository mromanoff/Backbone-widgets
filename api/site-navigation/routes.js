require('require-xml');
var Backbone = require('backbone');

var fixture = require('./fixture.xml');
var collection = new Backbone.Collection(JSON.parse(fixture).links.link);

module.exports = function(api) {
    api.route('/api/site-navigation')
        .get(function(req, res) {
            res.json(collection);
        });
};
