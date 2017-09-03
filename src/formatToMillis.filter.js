/**
 * Created by gabriel.rohden on 06/12/2016.
 * A filter to convert back the values from the module format to milliseconds
 */
(function () {
  'use strict';
  angular.module('GRHI').filter('formatToMillis', function () {
    //Float to XXh YYm  with checks
    //FIXME: use lodash for fusion/deflorestation benefits!!
    return function getHourFormatToMillis(input) {
      const normalized = (x => {
        if (/^\s*[0-9]+h\s*[0-9]+m$/i.test(x)) {
          return x.trim()
            .replace(/h/i, 'h ')
            .replace(/\s+/g, ' ')
            .split(/\s/);
        } else if (/^\s*[0-9]+h\s*$/i.test(x)) {
          return [x.trim(), 0];
        } else if (/^\s*[0-9]+m\s*$/i.test(x)) {
          return [0, x.trim()];
        }
      })(input);

      if (normalized) {
        return normalized
          .map((x, p) => Number(x.replace(/[hm]/i, '')) / (60 ** p))
          .reduce((x, y) => x + y) * 60 * 60 * 1000;
      } else {
        return undefined;
      }

    }
  });
})();