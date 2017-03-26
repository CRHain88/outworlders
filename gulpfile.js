var gulp = require('gulp');
var copy = require('gulp-copy');
var runSequence = require('run-sequence');

var dist = './dist/';
var distPublic = dist + './public/';

gulp.task('default', function() {
    'use strict';

    runSequence(
        ['copy:repo-meta']
    );
});

gulp.task('copy:repo-meta', function() {
    return gulp.src([
            './package.json',
            './README.md',
            './LICENSE',
        ])
    .pipe(copy(dist, { prefix: 2 }));
});
