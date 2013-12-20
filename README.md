angular-l10n
============

A small and simple provider for changing locale in angular.
To use, import module 'troch.l10n' in your app.

    var app = angular.module('app', ['troch.l10n']);

Set locale in config
--------------------

    app.config(['$l10nProvider', function($locationProvider) {
      $locationProvider.setLocale('en-gb');
    }

Set locale anywhere in your app
-------------------------------
$locale needs to be injected in your controller or directive

    $locale.setLocale('fr-fr');
