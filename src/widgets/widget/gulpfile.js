'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var util = require('util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var buffer = require('vinyl-buffer');
var exorcist = require('exorcist');
var watchify = require('watchify');
var _ = require('lodash');
var vendor = require('../../../gulp-config').vendor;

var bundleName = 'widget1';

var paths = {
    src: './',
    dest: '../../../public/js/'
};

var bundler = _.memoize(function (watch) {
    var options = {
        debug: true
    };

    if (watch) {
        _.extend(options, watchify.args);
    }

    var b = browserify(options)
        .add(paths.src + '/main.js')
        .external(vendor);

    if (watch) {
        b = watchify(b);
    }

    return b;
});

function bundle(cb, watch) {
    return bundler(watch)
        .bundle()
        .on('error', util.log)
        .pipe(source(bundleName + '.js'))
        .pipe(buffer())
        .pipe(transform(function () {
            return exorcist(paths.dest + bundleName + '.js.map');
        }))
        .pipe(gulp.dest(paths.dest))
        .on('end', cb);
}

gulp.task(bundleName + ':scripts', function (cb) {
    bundle(cb, true);
});

gulp.task(bundleName + ':lint', function () {
    // Note: To have the process exit with an error code (1) on
    //  lint error, return the stream and pipe to failOnError last.
    return gulp.src([paths.src + '/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task(bundleName + ':watch', [bundleName + ':build'], function () {
    bundler(true).on('update', function () {
        gulp.start(bundleName + ':scripts');
    });
});

gulp.task(bundleName + ':build', [
    bundleName + ':lint',
    bundleName + ':scripts'
]);

