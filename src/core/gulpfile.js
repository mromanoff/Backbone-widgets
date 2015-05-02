'use strict';

var gulp = require('gulp');
var util = require('util');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var exorcist = require('exorcist');

var core = require('../config/bundle').core;

var bundleName = 'core';

var paths = {
    dest: '../../public/js/'
};

gulp.task(bundleName + ':scripts', function () {
    var b = browserify({
        debug: true
    });

    return b.require(core)
        .bundle()
        .on('error', util.log)
        .pipe(source(bundleName + '.js'))
        .pipe(buffer())
        .pipe(transform(function () {
            return exorcist(paths.dest + bundleName + '.js.map');
        }))
        //.pipe(uglify())
        .pipe(gulp.dest(paths.dest));
});

gulp.task(bundleName + ':build', [bundleName + ':scripts']);
