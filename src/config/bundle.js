'use strict';

var vendor = [
    'jquery',
    'bootstrap',
    'underscore',
    'backbone',
    'backbone.marionette',
    'backbone.radio',
    'hbsfy/runtime',
    'd3'
];

var common = [
    'core/application',
    'core/module',
    'core/item-view',
    'core/layout-view',
    'core/collection-view',
    'core/composite-view',
    'core/model',
    'core/collection'
];

var helpers = [
    'helpers/format',
    'helpers/i18n',
    'helpers/locale'
];

var templates = [
    'templates/helpers',
    'templates/partials'
];

var bootstrap = [
    //'bootstrap.collapse'
];

exports.core = [].concat(vendor, bootstrap, common, helpers, templates);
