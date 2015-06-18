var Backbone = require('backbone');
var faker = require('faker');
var collection = new Backbone.Collection();

var limit = 40;

function getHexColor () {
    return '#' + (function lol(m, s, c) {
            return s[m.floor(m.random() * s.length)] + (c && lol(m, s, c - 1));
        })(Math, '0123456789ABCDEF', 4);
//
//hexColor = '#' + '0123456789abcdef'.split('').map(function (v, y, a) {
//        return y > 5 ? null : a[Math.floor(Math.random() * 16)];
//    }).join('');
}

for (var i = 0; i < limit; i++) {

    collection.add({
        id: faker.random.uuid(),
        label: faker.company.companyName(),
        innerLabel: null,
        value: faker.helpers.randomNumber(99),
        color: getHexColor()
    });
}

module.exports = function (api) {
    api.route('/api/charts')
        .get(function (req, res) {
            res.json(collection);
        });

    api.route('/api/charts/:id')
        .get(function (req, res) {
            var model = collection.get(req.params.id);
            res.json(model);
        });
};
