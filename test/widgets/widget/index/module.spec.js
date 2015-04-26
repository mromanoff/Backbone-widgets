'use strict';

var Marionette = require('backbone.marionette');
var module = require('../../../../src/widgets/widget/index/module');


// Test that the Module exists.
describe('widget/index/module', function () {
    it('exists', function () {
        expect(module).toBeDefined();
    });

    it('is a Backbone.Router', function () {
        expect(module.prototype instanceof Marionette.Module).toBe(true);
    });
});
