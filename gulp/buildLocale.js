'use strict';

var es = require('event-stream'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),

    buildLocale = function () {
        return es.map(function (file, callback) {
            var lines = String(file.contents).split("\n"),
                pluralVar = '',
                pluralFn = '',
                jsStr = '',
                jsMode = false;

            for (var i = 0; i < lines.length; i++) {
                var pos;
                if (jsMode === true) {
                    var search = '"pluralCat": function (n) {';
                    if ((pos = lines[i].indexOf(search)) > 0) {
                        jsMode = false;
                    }
                    jsStr += lines[i] + "\n";
                } else if ((pos = lines[i].indexOf('var PLURAL_CATEGORY')) === 0) {
                    pluralVar = lines[i];
                } else if ((pos = lines[i].indexOf('DATETIME_FORMATS')) > 0) {
                    jsStr = lines[i];
                    jsMode = true;
                }
            }

            file.path = file.path.replace(/angular-locale_(.*).js$/, '$1.js')
            file.contents = new Buffer('$l10nProvider.addLocale((function() { ' + pluralVar + 'return {' + jsStr + '};})());');

            callback(null, file);
        });
    };

module.exports = buildLocale;
