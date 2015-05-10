var Backbone = require('backbone');
var faker = require('faker');

var model = new Backbone.Model();

model.set({
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.firstName(),
    avatar: faker.internet.avatar(),
    telephone: faker.phone.phoneNumber()
});

module.exports = function (api) {
    api.route('/api/persona')
        .get(function (req, res) {
            res.json(model);
        });
};

