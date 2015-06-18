'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var del = require('del');
var browserify = require('browserify');

var karma = require('karma').server;

var paths = {
    styles: ['./src/main.scss', './src/**/*.scss']
};

gulp.task('clean', function (cb) {
    del([
        'public/js/*',
        'public/css/*'
    ], cb);
});

gulp.task('fonts', function () {
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

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('tdd', function () {
    return karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    });
});

gulp.task('test', function () {
    return karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    });
});

gulp.task('build', [
    //'clean',
    'styles',
    'fonts'
]);

gulp.task('default', ['watch']);
