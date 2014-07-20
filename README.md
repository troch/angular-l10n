angular-l10n
============

A small and simple provider for changing locale in angular.
To use, import module `'troch.l10n'` in your app.

    var app = angular.module('app', ['troch.l10n']);

Building library
----------------
By default, no locales are included in angular-l10n.js. All locales available with angularjs can be used in your applicaation. For including locales you need in your app:

### With gulp
Run the following command line with the locales you want to be available in your angular application. Example:
`gulp build --locales=en-gb,fr-fr`

### Without gulp
Simply replace `/*LOCALES_HERE*/` in angular-l10n.js with the list of ocales required by your application. All locales are located in folders `locales/js` or `locales/min` (non-uglified and uglified files). The final file should look like below:

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
