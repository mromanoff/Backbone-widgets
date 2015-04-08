var Backbone = require('backbone');
var faker = require('faker');
//var fixture = require('./fixture');
//var collection = new Backbone.Collection(fixture);

var collection = new Backbone.Collection();

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
    'use strict';
    return (Math.random() * (max - min) + min).toFixed(2);
}

for (var i = 0; i < 12; i++) {
    collection.add({
        id: faker.random.uuid(),
        accountName: faker.name.findName(),
        allocationValue: faker.finance.amount(),
        currencySymbol: faker.finance.currencySymbol(),
        allocationPercentage: getRandomArbitrary(-1, 1)
    });
}


module.exports = function(api) {
    api.route('/api/accounts')
        .get(function(req, res) {
            res.json(collection);
        });

    api.route('/api/accounts/:id')
        .get(function(req, res) {
            var model = collection.get(req.params.id);
            res.json(model);
        });
};
