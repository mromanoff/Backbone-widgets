var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');
require('bootstrap');
//require('backbone.syphon');

/*

import Backbone from 'backbone';
import $ from 'jquery';
Backbone.$ = $;
import Marionette from 'backbone.marionette';
import 'bootstrap';
import 'backbone.syphon';
import 'backbone-query-parameters';
import 'babel/polyfill';
*/

// start the marionette inspector
if (window.__agent) {
    window.__agent.start(Backbone, Marionette);
}
