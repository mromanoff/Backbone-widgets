'use strict';

var Model = require('../../src/accounts/model');

describe('Accounts Model', function () {
    it('should be defined', function () {
        expect(Model).toBeDefined();
    });

    describe('when creating a new model', function () {

        beforeEach(function () {
            this.model = new Model({
                accountName: 'Savings',
                allocationValue: 123,
                allocationPercentage: -10.3
            });
        });

        it('should expose the account name attribute', function () {
            expect(this.model.get('accountName')).toEqual('Savings');

        });

        it('should expose the allocation value attribute', function () {
            expect(this.model.get('allocationValue')).toEqual(123);
        });

        it('should expose the allocation percentage attribute', function () {
            expect(this.model.get('allocationPercentage')).toEqual(-10.3);
        });
    });

});
