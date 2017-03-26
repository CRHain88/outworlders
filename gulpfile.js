var gulp = require('gulp');
var copy = require('gulp-copy');
var runSequence = require('run-sequence');

var distPublic = './dist/public/';

gulp.task('default', function() {
    'use strict';

    runSequence(
        ['copy:assets']
    );
});

gulp.task('copy:assets', function() {
    return gulp.src([
        './src/public/assets/',
    ], {})
    .pipe(copy(distPublic))
    .dest(distPublic);
});
