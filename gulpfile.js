var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var eslint = require('gulp-eslint');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var path = require('path');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var minifyCss = require('gulp-minify-css');


var paths = {
    vendor: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/underscore/underscore.js',
        './bower_components/backbone/backbone.js'
    ],
    scripts: ['src/**/*.js'],
    styles: ['./src/main.less', './src/**/*.less']
};

gulp.task('clean', function () {
    return gulp.src('public/js', {read: false})
        .pipe(clean());
});

gulp.task('styles', function() {
    return gulp.src('./src/main.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('scripts', ['clean'], function() {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
         .pipe(uglify())
         .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js'));

    // create 1 vendor.js file from all vendor plugin code
    gulp.src(paths.vendor)
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('lint', function () {
    // Note: To have the process exit with an error code (1) on
    //  lint error, return the stream and pipe to failOnError last.
    return gulp.src(['src/app/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

//gulp.task('watch', function () {
//    gulp.src('src/**/*.js')
//        .pipe(watch('src/**/*.js'))
//        .pipe(gulp.dest('public/js'));
//});


// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['lint', 'scripts']);
});

gulp.watch(paths.styles, ['styles']);


gulp.task('build', [
    'clean',
    'lint',
    'scripts',
    'styles',
    'watch'
]);

gulp.task('default', ['build']);
