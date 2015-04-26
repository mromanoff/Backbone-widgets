'use strict';

module.exports = function (karma) {
    karma.set({

        frameworks: ['jasmine', 'browserify'],

        files: [
            //'src/**/*.js',
            'test/setup/helpers.js',
            'test/**/*.spec.js'
        ],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            'src/**/*.js': ['coverage'],
            'test/setup/helpers.js': ['browserify'],
            'test/**/*.spec.js': ['browserify']
        },

        port: 9876,

        colors: true,

        logLevel: 'LOG_DEGUG',

        singleRun: true,

        autoWatch: false,

        browsers: ['PhantomJS'],

        // browserify configuration
        browserify: {
            debug: true,
            extensions: ['.js', '.hbs'],
            transform: [
                'hbsfy',
                'browserify-shim'
            ]
        },

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-browserify',
            'karma-coverage'
        ],

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'test/coverage/'
        }

    });
};
