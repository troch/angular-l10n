angular-l10n
============

A small and simple provider for changing locale in angular

Set locale in config
--------------------

    app.config(['$l10nProvider', function($locationProvider) {
      $locationProvider.setLocale('en-gb');
    }

Set locale anywhere in your app
-------------------------------
$locale needs to be injected in your controller or directive

    $locale.setLocale('fr-fr');
