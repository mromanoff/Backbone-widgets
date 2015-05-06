var Backbone = require('backbone');
var faker = require('faker');

var model = new Backbone.Model();

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
    'use strict';
    return (Math.random() * (max - min) + min).toFixed(2);
}

model.set({
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.firstName(),
    avatar: faker.internet.avatar(),
    telephone: faker.phone.phoneNumber()
});

module.exports = function (api) {
    api.route('/api/widget')
        .get(function (req, res) {
            res.json(model);
        });
};

