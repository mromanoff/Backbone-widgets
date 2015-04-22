'use strict';

module.exports = function (karma) {
    karma.set({

        frameworks: ['jasmine', 'browserify'],

        files: [
            'test/setup/helpers.js',
            'test/**/*Spec.js'
        ],

        //reporters: ['dots'],
        reporters: ['progress'],

        preprocessors: {
            'test/setup/helpers.js': ['browserify'],
            'test/**/*Spec.js': ['browserify']
        },

        browsers: ['PhantomJS'],

        //logLevel: 'LOG_DEBUG',

        singleRun: true,
        autoWatch: false,

        // browserify configuration
        browserify: {
            debug: true,
            transform: ['hbsfy', 'browserify-shim']
        }
    });
};

//module.exports = function (config) {
//    config.set({
//        // include browserify first in used frameworks
//        frameworks: ['browserify', 'jasmine'],
//
//        // add all your files here,
//        // including non-commonJS files you need to load before your test cases
//        files: [
//            'src/**/*.js',
//            'test/**/*.js'
//        ],
//
//        preprocessors: {
//            //'test/**/*.spec.js': ['coverage', 'browserify']
//            'test/**/*.js': ['browserify']
//        },
//
//        // see what is going on
//        logLevel: 'LOG_DEBUG',
//
//
//        // use autoWatch=true for quick and easy test re-execution once files change
//        autoWatch: true,
//
//        browsers: ['PhantomJS'],
//        reporters: [],
//        //reporters: ['coverage', 'spec', 'failed'],
//        browserify: {
//            debug: true,
//            transform: ['hbsfy'],
//            configure: function (bundle) {
//                bundle.on('prebundle', function () {
//                    bundle.external('jquery');
//                });
//            }
//
//        }
//    });
//};
//
///*
// // Karma configuration
// // Generated on Mon Apr 20 2015 22:17:03 GMT-0400 (EDT)
//
// module.exports = function (config) {
// config.set({
//
// // base path that will be used to resolve all patterns (eg. files, exclude)
// basePath: '',
//
// // frameworks to use
// // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
// frameworks: ['jasmine'],
//
// // list of files / patterns to load in the browser
// files: [
// 'src/!**!/!*.js',
// 'test/!**!/!*.spec.js'
// ],
//
// // list of files to exclude
// exclude: [],
//
// // preprocess matching files before serving them to the browser
// // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
// preprocessors: {},
//
// // test results reporter to use
// // possible values: 'dots', 'progress'
// // available reporters: https://npmjs.org/browse/keyword/karma-reporter
// reporters: ['progress'],
//
// // web server port
// port: 9876,
//
// // enable / disable colors in the output (reporters and logs)
// colors: true,
//
// // level of logging
// // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
// logLevel: config.LOG_INFO,
//
// // enable / disable watching file and executing tests whenever any file changes
// autoWatch: true,
//
// // start these browsers
// // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
// browsers: ['PhantomJS'],
//
// // Continuous Integration mode
// // if true, Karma captures browsers, runs the tests and exits
// singleRun: false
// });
// };
// */
