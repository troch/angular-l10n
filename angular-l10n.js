angular.module('troch.l10n', ['ngLocale']).provider('$l10n', function() {
    var availableLocales = {
        'fr-fr': {"DATETIME_FORMATS": {"AMPMS": ["AM", "PM"], "DAY": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], "MONTH": ["janvier", "f\u00e9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\u00fbt", "septembre", "octobre", "novembre", "d\u00e9cembre"], "SHORTDAY": ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."], "SHORTMONTH": ["janv.", "f\u00e9vr.", "mars", "avr.", "mai", "juin", "juil.", "ao\u00fbt", "sept.", "oct.", "nov.", "d\u00e9c."], "fullDate": "EEEE d MMMM y", "longDate": "d MMMM y", "medium": "d MMM y HH:mm:ss", "mediumDate": "d MMM y", "mediumTime": "HH:mm:ss", "short": "dd/MM/yy HH:mm", "shortDate": "dd/MM/yy", "shortTime": "HH:mm"}, "NUMBER_FORMATS": {"CURRENCY_SYM": "\u20ac", "DECIMAL_SEP": ",", "GROUP_SEP": "\u00a0", "PATTERNS": [{"gSize": 3, "lgSize": 3, "macFrac": 0, "maxFrac": 3, "minFrac": 0, "minInt": 1, "negPre": "-", "negSuf": "", "posPre": "", "posSuf": ""}, {"gSize": 3, "lgSize": 3, "macFrac": 0, "maxFrac": 2, "minFrac": 2, "minInt": 1, "negPre": "(", "negSuf": "\u00a0\u00a4)", "posPre": "", "posSuf": "\u00a0\u00a4"}]}, "id": "fr-fr", "pluralCat": function(n) {
                if (n >= 0 && n <= 2 && n != 2) {
                    return PLURAL_CATEGORY.ONE;
                }
                return PLURAL_CATEGORY.OTHER;
            }},
        'en-gb': {"DATETIME_FORMATS": {"AMPMS": ["AM", "PM"], "DAY": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "MONTH": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "SHORTDAY": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], "SHORTMONTH": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], "fullDate": "EEEE, d MMMM y", "longDate": "d MMMM y", "medium": "d MMM y HH:mm:ss", "mediumDate": "d MMM y", "mediumTime": "HH:mm:ss", "short": "dd/MM/yyyy HH:mm", "shortDate": "dd/MM/yyyy", "shortTime": "HH:mm"}, "NUMBER_FORMATS": {"CURRENCY_SYM": "\u00a3", "DECIMAL_SEP": ".", "GROUP_SEP": ",", "PATTERNS": [{"gSize": 3, "lgSize": 3, "macFrac": 0, "maxFrac": 3, "minFrac": 0, "minInt": 1, "negPre": "-", "negSuf": "", "posPre": "", "posSuf": ""}, {"gSize": 3, "lgSize": 3, "macFrac": 0, "maxFrac": 2, "minFrac": 2, "minInt": 1, "negPre": "\u00a4-", "negSuf": "", "posPre": "\u00a4", "posSuf": ""}]}, "id": "en-gb", "pluralCat": function(n) {
                if (n == 1) {
                    return PLURAL_CATEGORY.ONE;
                }
                return PLURAL_CATEGORY.OTHER;
            }}
    },
    initLocale = undefined;
    this.setLocale = function(localeId) {
        initLocale = localeId;
    };

    this.$get = ['$locale', '$rootScope', function($locale, $rootScope) {
            var setLocale = function(localeId) {
                if (angular.isObject(availableLocales[localeId]) && localeId !== $locale.id) {
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
});