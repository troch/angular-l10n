module.exports = function(grunt) {

    /* Read options */
    var buildLocales = grunt.option('buildLocales') || false,
        locales = eval(grunt.option('locales')) || [];
    
    function buildJsonLocaleFile(file) {
        var regexp = 'angular-locale_(.*).js',
            matches = file.match(regexp);
        if (matches === null) {
            return;
        }
        var culture =  matches[1],
            cultureFile = culture + '.js';
            fileContent = grunt.file.read(file);
        //var m = fileContent.match('(.*)var PLURAL_CATEGORY = (.*);\n\$provide.value\("$locale", (.*)"pluralCat": function \(n\) { (.*)}\n}\);\n}\]\);');
        var lines = fileContent.split("\n"),
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
        jsStr = '$l10nProvider.addLocale((function() { ' + pluralVar + 'return {' + jsStr + '};})());';
        grunt.file.write('locale/js/' + cultureFile, jsStr);
        //console.log(JSON.parse(jsStr));
    }

    function listLocaleFilesToUglify() {
        var list = {};
        var rec = function(filePath, path) {
            var source = filePath,
                dest = filePath.replace(path, 'locale/min').replace('.js', '.min.js');
            list[dest] = source;
        };
        grunt.file.recurse('locale/js', rec);
        return list;
    }

    function addLocalesAndCopyFile() {
        var placeHolder = "/*LOCALES_HERE*/",
            replaceWith = '';
        for (var i = 0; i < locales.length; i++) {
            replaceWith += grunt.file.read('locale/min/' + locales[i] + '.min.js') + "\n";
        }
        var file = grunt.file.read('angular-l10n.js');
        //grunt.file.copy('angular-l10n.js', 'build/angular-l10n.js');
        grunt.file.write('build/angular-l10n.js', file.replace(placeHolder, replaceWith));
    }

    /* Project configuration */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['angular-l10n.js'],
            options: {
                es5: true,
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                globals: {
                    angular: true,
                    '$': true
                }
            }
        },
        jsbeautifier : {
            files : ['locale/js/*.js'],
            options : {
            }
        },
        uglify: {
            locales : {
                files : listLocaleFilesToUglify(),
                options : {
                    dead_code : false
                }
            },
            release : {
                options: {
                   banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n\'use strict\';\n'
                },
                files: {'build/<%= pkg.name %>-<%= pkg.version %>.min.js' : 'build/angular-l10n.js'}
            }
        }
    });

    /* Load the plugins that provide tasks. */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /* Register default task */
    if (buildLocales === true) {
        grunt.file.recurse('locale/angular', buildJsonLocaleFile);
        grunt.registerTask('default', ['uglify:locales', 'jsbeautifier']);
    } else {
        // add locales to release
        addLocalesAndCopyFile();
        grunt.registerTask('default', ['jshint', 'uglify:release']);
    }
    return grunt;
};