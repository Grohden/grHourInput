/**
 * Created by gabriel.rohden on 06/12/2016.
 * A filter and its models to convert the given valid values to the main format.
 */

/*global angular*/

(function () {
  'use strict';

  angular
    .module('GRHI')
    .filter('floatToHourFormat', filterWrapper);

  const baseMinutes = 60; //it could be 59.
  const isInvalidValidFormat = (x) => !(/^-?[0-9]*(\.|,)?[0-9]*$/i.test(x));
  const asValidNumber = (x) => Number(x.toString().replace(',', '.'));
  const asFixedNumber = (n, fix) => Number(n.toFixed(fix || 0))

  filterWrapper.$inject = [];
  function filterWrapper() {
    /**
     * Float to XXh YYm  with checks
     * @param float {Number} float to be converted
     * @param options - a {@link FilterOptionModel} option.
     */
    function floatToFormat(float, options) {

      //is a invalid float or integer?
      if (isInvalidValidFormat(float)) {
        return float;
      }

      const configurations = angular.extend({
        maxHours: Infinity,
        customHours: {}
      }, options);

      const timeValue = ((timeValue) => {
        //Default conversions options
        switch (timeValue) {
          case 'milliseconds':
            return asValidNumber(float) / 60 / 60 / 1000;
          case 'seconds':
            return asValidNumber(float) / 60 / 60;
          case 'minutes':
            return asValidNumber(float) / 60;
          default:
            return asValidNumber(float);
        }
      })(configurations.expected);

      const hours = Math.floor(timeValue);
      const minutes = asFixedNumber((timeValue * baseMinutes) % baseMinutes);

      if (hours <= configurations.maxHours) {
        //If result in zero omit or set floor.
        if (minutes + hours < 0) {
          return configurations.customHours["0h 0m"] || "0h 0m";
        }

        const formated = (hours > 0 ? `${hours}h ` : '') + (minutes > 0 ? `${minutes}m` : '');
        return configurations.customHours[formated] || formated;
      } else {
        return `${configurations.maxHours} 59m`;
      }
    }

    return floatToFormat
  }

})();