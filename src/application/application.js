//var  $ = require('jquery');
//var  _ = require('lodash');
//var Radio = require('backbone.radio');

var Application = require('../common/application');
var LayoutView = require('./layout-view');

module.exports = Application.extend({
    initialize: function() {
        this.layout = new LayoutView();
        this.layout.render();
    }
});


//import nprogress from 'nprogress';
//import Application from '../common/application';
//import LayoutView from './layout-view';
//
//let routerChannel = Radio.channel('router');
//
//nprogress.configure({
//    showSpinner: false
//});
//
//export default Application.extend({
//    initialize() {
//    this.$body = $(document.body);
//    this.layout = new LayoutView();
//    this.layout.render();
//
//    this.listenTo(routerChannel, {
//        'before:enter:route' : this.onBeforeEnterRoute,
//        'enter:route'        : this.onEnterRoute,
//        'error:route'        : this.onErrorRoute
//    });
//},
//
//onBeforeEnterRoute() {
//    this.transitioning = true;
//    // Don't show for synchronous route changes
//    _.defer(() => {
//        if (this.transitioning) {
//        nprogress.start();
//    }
//});
//},
//
//onEnterRoute() {
//    this.transitioning = false;
//    this.$body.scrollTop(0);
//    nprogress.done();
//},
//
//onErrorRoute() {
//    this.transitioning = false;
//    nprogress.done(true);
//}
//});