var gulp = require('gulp');
var copy = require('gulp-copy');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

var dist = './dist/';
var distPublic = dist + './public/';

gulp.task('default', function() {
    'use strict';

    runSequence(
        ['copy:repo-meta', 'copy:craft'],
        ['rename:craft-db-config', 'rename:craft-general-config']
    );
});

gulp.task('copy:repo-meta', function() {
    return gulp.src([
        './package.json',
        './README.md',
        './LICENSE',
    ])
    .pipe(copy(dist));
});

gulp.task('copy:craft', function() {
    return gulp.src([
        './src/craft/**/*',
        './src/craft/**/.*',
    ])
    .pipe(copy(dist, { prefix: 1 }))
});

gulp.task('rename:craft-db-config', function() {
    return gulp.src('./src/craft-db-config.php')
        .pipe(rename('./db.php'))
        .pipe(gulp.dest(dist + './craft/config'));
});

gulp.task('rename:craft-general-config', function() {
    return gulp.src('./src/craft-general-config.php')
        .pipe(rename('./general.php'))
        .pipe(gulp.dest(dist + './craft/config'));
})
