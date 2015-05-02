'use strict';

var vendor = [
    'jquery',
    'underscore',
    'backbone',
    'backbone.marionette',
    'backbone.radio',
    'hbsfy/runtime',
    'bootstrap'
];

var common = [
    'core/application',
    'core/module',
    'core/item-view',
    'core/layout-view',
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

exports.core = [].concat(vendor, common, helpers, templates);
