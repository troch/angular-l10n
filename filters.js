/**
 * 'numberl10n' and 'currencyl10n' filters are to be used instead of
 * Angular's 'number' and 'currency' filters.
 * Date filter doesn't need to be replaced.
 * Check out why: https://github.com/angular/angular.js/pull/6893
 */

'use strict';

var DECIMAL_SEP = '.';
function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
    if (number == null || !isFinite(number) || isObject(number)) return '';

    var isNegative = number < 0;
    number = Math.abs(number);
    var numStr = number + '',
            formatedText = '',
            parts = [];

    var hasExponent = false;
    if (numStr.indexOf('e') !== -1) {
        var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
        if (match && match[2] == '-' && match[3] > fractionSize + 1) {
            numStr = '0';
            number = 0;
        } else {
            formatedText = numStr;
            hasExponent = true;
        }
    }

    if (!hasExponent) {
        var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;

        // determine fractionSize if it is not specified
        if (isUndefined(fractionSize)) {
            fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
        }

        // safely round numbers in JS without hitting imprecisions of floating-point arithmetics
        // inspired by:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
        number = +(Math.round(+(number.toString() + 'e' + fractionSize)).toString() + 'e' + -fractionSize);

        var fraction = ('' + number).split(DECIMAL_SEP);
        var whole = fraction[0];
        fraction = fraction[1] || '';

        var i, pos = 0,
                lgroup = pattern.lgSize,
                group = pattern.gSize;

        if (whole.length >= (lgroup + group)) {
            pos = whole.length - lgroup;
            for (i = 0; i < pos; i++) {
                if ((pos - i)%group === 0 && i !== 0) {
                    formatedText += groupSep;
                }
                formatedText += whole.charAt(i);
            }
        }

        for (i = pos; i < whole.length; i++) {
            if ((whole.length - i)%lgroup === 0 && i !== 0) {
                formatedText += groupSep;
            }
            formatedText += whole.charAt(i);
        }

        // format fraction part.
        while(fraction.length < fractionSize) {
            fraction += '0';
        }

        if (fractionSize && fractionSize !== "0") formatedText += decimalSep + fraction.substr(0, fractionSize);
    } else {

        if (fractionSize > 0 && number > -1 && number < 1) {
            formatedText = number.toFixed(fractionSize);
        }
    }

    parts.push(isNegative ? pattern.negPre : pattern.posPre);
    parts.push(formatedText);
    parts.push(isNegative ? pattern.negSuf : pattern.posSuf);
    return parts.join('');
}

/**
 * Currency filter
 */
angular.module('troch.l10n').filter('currencyl10n', [
    '$locale',
    function currencyL10nFilter($locale) {
        return function(amount, currencySymbol){
            var formats = $locale.NUMBER_FORMATS;
            if (isUndefined(currencySymbol)) currencySymbol = formats.CURRENCY_SYM;
                return formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, 2)
                    .replace(/\u00A4/g, currencySymbol);
        };
    }
]);

/**
 * Number filter
 */
angular.module('troch.l10n').filter('numberl10n', [
    '$locale',
    function numberL10nFilter($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function(number, fractionSize) {
            return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP,
                fractionSize);
        };
    }
]);
