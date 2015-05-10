'use strict';

var Backbone = require('backbone');
var Model = require('../../.././index/model');

describe('widget/index/model', function () {
    it('exists', function() {
        expect(Model).toBeDefined();
    });

    it('is a Backbone.Router', function() {
        expect(Model.prototype instanceof Backbone.Model).toBe(true);
    });

    describe('when creating a new model', function () {

        beforeEach(function () {
            this.model = new Model({
                accountName: 'Savings',
                allocationValue: 123,
                allocationPercentage: -1.3
            });
        });

        it('should expose the account name attribute', function () {
            expect(this.model.get('accountName')).toEqual('Savings');

        });

        it('should expose the allocation value attribute', function () {
            expect(this.model.get('allocationValue')).toEqual(123);
        });

        it('should expose the allocation percentage attribute', function () {
            expect(this.model.get('allocationPercentage')).toEqual(-1.3);
        });
    });
});
