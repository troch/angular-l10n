'use strict';

var es = require('event-stream'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    argv = require('yargs').argv,
    // gutil = require('gulp-util'),

    addLocales = function () {
        return es.map(function (file, callback) {
            var locales = argv.locales ? argv.locales.split(',') : [],
                localeFiles = [];

            locales.forEach(function (locale) {
                localeFiles.push('locale/min/' + locale + '.min.js');
            });

            gulp.src(localeFiles)
                .pipe(concat('locales.js'))
                .pipe(es.map(function (localeFile) {
                    file.contents = new Buffer(
                        String(file.contents).replace(
                            '/*LOCALES_HERE*/',
                            String(localeFile.contents)
                        )
                    );

                    callback(null, file);
                }));
        });
    };

module.exports = addLocales;
