$l10nProvider.addLocale((function() {
    var PLURAL_CATEGORY = {
        ZERO: "zero",
        ONE: "one",
        TWO: "two",
        FEW: "few",
        MANY: "many",
        OTHER: "other"
    };
    return {
        "DATETIME_FORMATS": {
            "AMPMS": [
                "AM",
                "PM"
            ],
            "DAY": [
                "s\u00f8ndag",
                "mandag",
                "tirsdag",
                "onsdag",
                "torsdag",
                "fredag",
                "l\u00f8rdag"
            ],
            "MONTH": [
                "januar",
                "februar",
                "mars",
                "april",
                "mai",
                "juni",
                "juli",
                "august",
                "september",
                "oktober",
                "november",
                "desember"
            ],
            "SHORTDAY": [
                "s\u00f8n.",
                "man.",
                "tir.",
                "ons.",
                "tor.",
                "fre.",
                "l\u00f8r."
            ],
            "SHORTMONTH": [
                "jan.",
                "feb.",
                "mars",
                "apr.",
                "mai",
                "juni",
                "juli",
                "aug.",
                "sep.",
                "okt.",
                "nov.",
                "des."
            ],
            "fullDate": "EEEE d. MMMM y",
            "longDate": "d. MMMM y",
            "medium": "d. MMM y HH:mm:ss",
            "mediumDate": "d. MMM y",
            "mediumTime": "HH:mm:ss",
            "short": "dd.MM.yy HH:mm",
            "shortDate": "dd.MM.yy",
            "shortTime": "HH:mm"
        },
        "NUMBER_FORMATS": {
            "CURRENCY_SYM": "kr",
            "DECIMAL_SEP": ",",
            "GROUP_SEP": "\u00a0",
            "PATTERNS": [{
                "gSize": 3,
                "lgSize": 3,
                "macFrac": 0,
                "maxFrac": 3,
                "minFrac": 0,
                "minInt": 1,
                "negPre": "-",
                "negSuf": "",
                "posPre": "",
                "posSuf": ""
            }, {
                "gSize": 3,
                "lgSize": 3,
                "macFrac": 0,
                "maxFrac": 2,
                "minFrac": 2,
                "minInt": 1,
                "negPre": "\u00a4\u00a0-",
                "negSuf": "",
                "posPre": "\u00a4\u00a0",
                "posSuf": ""
            }]
        },
        "id": "no",
        "pluralCat": function(n) {
            if (n == 1) {
                return PLURAL_CATEGORY.ONE;
            }
            return PLURAL_CATEGORY.OTHER;
        }
    };
})());