'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var util = require('util');
var del = require('del');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var _ = require('lodash');


var paths = {
    //vendor: [
    //    './bower_components/jquery/dist/jquery.js',
    //    './bower_components/underscore/underscore.js',
    //    './bower_components/backbone/backbone.js'
    //],
   // scripts: ['src/**/*.js'],
    styles: ['./src/main.scss', './src/**/*.scss']
};

var reporter = 'spec';

gulp.task('clean', function(cb) {
    del([
        'public/js',
        'public/css'
    ], cb);
});

gulp.task('fonts', function() {
    return gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*')
        .pipe(plumber())
        .pipe(gulp.dest('./public/fonts/bootstrap/'));
});


gulp.task('styles', function () {
    gulp.src('./src/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./public/css'));
});

var bundler = _.memoize(function(watch) {
    var options = {debug: true};

    if (watch) {
        _.extend(options, watchify.args);
    }

    var b = browserify('./src/main.js', options);

    if (watch) {
        b = watchify(b);
    }

    return b;
});

function bundle(cb, watch) {
    return bundler(watch).bundle()
        .on('error', util.log)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js'))
        .on('end', cb);
}

gulp.task('scripts', function(cb) {
    process.env.BROWSERIFYSWAP_ENV = 'dist';
    bundle(cb, true);
});


gulp.task('lint', function () {
    // Note: To have the process exit with an error code (1) on
    //  lint error, return the stream and pipe to failOnError last.
    return gulp.src(['src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('watch', ['build'], function(cb) {

    reporter = 'dot';
    bundler(true).on('update', function() {
        gulp.start('scripts');
        //gulp.start('test');
    });
    gulp.watch(paths.styles, ['styles']);
    //gulp.watch('./test/**/*.js', ['test']);
    //gulp.watch(['./src/main.less', './src/**/*.less'], ['styles']);
    //gulp.watch(['./src/*.html'], ['html']);
});



gulp.task('build', [
    'clean',
   // 'lint',
    'scripts',
    'styles',
    'fonts'
]);

gulp.task('default', ['watch']);
