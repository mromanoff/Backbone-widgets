'use strict';

var Marionette = require('backbone.marionette');
var module = require('../../../../src/widgets/widget/index/module');


// Test that the Router exists.
describe('Widget Index Module', function () {
    it('exists', function () {
        expect(module).toBeDefined();
    });

    it('is a Backbone.Router', function () {
        expect(module.prototype instanceof Marionette.Module).toBe(true);
    });
});
