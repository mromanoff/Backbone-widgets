var Backbone = require('backbone');
var fixture = require('./fixture');
var model = new Backbone.Model(fixture);

module.exports = function(api) {
    api.route('/api/markets')
        .get(function(req, res) {
            res.json(model);
        });
};
