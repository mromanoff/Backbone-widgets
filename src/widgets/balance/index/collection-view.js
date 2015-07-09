'use strict';

var CollectionView = require('core/collection-view');
var CompositeView = require('./composite-view');

module.exports = CollectionView.extend({
    childView: CompositeView
});
