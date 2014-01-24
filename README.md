angular-l10n
============

A small and simple provider for changing locale in angular.
To use, import module `'troch.l10n'` in your app.

    var app = angular.module('app', ['troch.l10n']);

Building library
----------------
By default, no locales are included in angular-l10n.js. All locales available with angularjs can be used in your applicaation. For including locales you need in your app:

### With grunt
Run the following command line with the locales you want to be available in your angular application. Example:
`grunt --locales=['en-gb', 'fr-fr']`

### Without grunt
Simply replace `/*LOCALES_HERE*/` in angular-l10n.js by the locales required in your application. All the locales are located in folders `locale/js` or `locale/min` (non-uglified and uglified files). The final file should look like this:

    }).config(['$l10nProvider', function($l10nProvider) {
        $l10nProvider.addLocale(function(){ ... id:'fr-fr',...}());
        $l10nProvider.addLocale(function(){ ... id:'en-gb',...}());
    }]);

How to use
----------
### Set locale in app config
This will set the locale your application will start with.

    app.config(['$l10nProvider', function($locationProvider) {
      $l10nProvider.setLocale('en-gb');
    }

### Change locale from anywhere in your app
$l10n needs to be injected in your controller or directive

    $l10n.setLocale('fr-fr');
