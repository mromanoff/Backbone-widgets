'use strict';

var gulp = require('gulp');
var util = require('util');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var vendor = require('../../gulp-config').vendor;

var bundleName = 'vendor';

var paths = {
    dest: '../../public/js/'
};

gulp.task(bundleName + ':scripts', function () {
    var b = browserify({
        debug: false
    });

    return b.require(vendor)
        .bundle()
        .on('error', util.log)
        .pipe(source(bundleName + '.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest))
});

gulp.task(bundleName + ':build', [bundleName + ':scripts']);
