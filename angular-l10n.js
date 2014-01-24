angular.module('troch.l10n', ['ngLocale']).provider('$l10n', function() {
    var availableLocales = {},
    initLocale = null;
    this.setLocale = function(localeId) {
        initLocale = localeId;
    };
    this.addLocale = function(locale) {
        if (locale.id) {
            availableLocales[locale.id] = locale;
        }
    };

    this.$get = ['$locale', '$rootScope', function($locale, $rootScope) {
            var setLocale = function(localeId) {
                if (angular.isObject(availableLocales[localeId]) && localeId !== $locale.id) {
                    // Ideally we would use $provide.value("$lcaole", availableLocales[localeId]);
                    $locale.DATETIME_FORMATS = availableLocales[localeId].DATETIME_FORMATS;
                    $locale.NUMBER_FORMATS = availableLocales[localeId].NUMBER_FORMATS;
                    $locale.id = localeId;
                    $locale.pluralCat = availableLocales[localeId].pluralCat;
                    $rootScope.$broadcast('l10n.localeChange');
                }
            };
            if (!angular.isUndefined(initLocale)) {
                // Lazy loading
                setLocale(initLocale);
            }
            return {
                setLocale: function(localeId) {
                    setLocale(localeId);
                }
            };
        }
    ];
}).config(['$l10nProvider', function($l10nProvider) {
        /*LOCALES_HERE*/
}]);