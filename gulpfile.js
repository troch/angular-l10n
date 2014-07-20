'use strict';

var gulp = require('gulp'),
    // Gulp modules
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    beautify = require('gulp-beautify'),
    rename = require('gulp-rename'),
    // Custom modules
    buildLocale = require('./gulp/buildLocale'),
    addLocales = require('./gulp/addLocales'),
    // Local variables
    scripts = ['angular-l10n.js', 'filters.js'];


gulp.task('build', function() {
    gulp.src(scripts)
        .pipe(jshint())
        .pipe(concat('angular-l10n.js'))
        .pipe(addLocales())
        .pipe(gulp.dest('build/'))
        .pipe(uglify({mangle: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/'));
});

gulp.task('buildLocales', function () {
    gulp.src('locales/angular/angular-locale_*.js')
        .pipe(buildLocale())
        .pipe(beautify({indentSize: 4}))
        .pipe(gulp.dest('locales/js/'))
        .pipe(uglify({mangle: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('locales/min/'))
});
