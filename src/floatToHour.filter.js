/**
 * Created by gabriel.rohden on 06/12/2016.
 * A filter and its models to convert the given valid values to the main format.
 */

/*global angular*/

(function () {
  'use strict';

  angular.module('GRHI').filter('floatToHourFormat', function () {
    const baseMinutes = 60;

    const isInvalidValidFormat = (x) => !(/^[0-9]*(\.|,)?[0-9]*$/i.test(x));
    const asValidNumber = (x) => Number(x.toString().replace(',', '.'));
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

      const timeValue = (function () {
        //Default conversions options
        switch (configurations.expected) {
          case 'milliseconds':
            return asValidNumber(float) / 60 / 60 / 1000;
          case 'seconds':
            return asValidNumber(float) / 60 / 60;
          case 'minutes':
            return asValidNumber(float) / 60;
          default:
            return asValidNumber(float);
        }
      })();

      let minutes = Number(((timeValue * baseMinutes) % baseMinutes).toFixed(0));
      let hours = Math.floor(Number(timeValue));

      //Checks if its the minutes should be converted to hours.
      if (minutes >= baseMinutes) {
        hours += Number((minutes / baseMinutes).toFixed(0));
        minutes = 0;
      }

      let format;
      let customHour;

      if (hours <= configurations.maxHours) {
        //If result in zero omit or set floor.
        if (minutes <= 0 && hours <= 0) {
          format = "0h 0m";
          customHour = configurations.customHours[format];
          if (customHour) {
            return customHour;
          } else {
            return format;
          }
        }
        
        //Just for the space between.
        if (hours > 0 && minutes > 0) {
          format = `${hours}h ${minutes}m`;
          customHour = configurations.customHours[format];
          if (customHour) {
            return customHour;
          } else {
            return format;
          }
        }

        //else it does'nt have space.
        hours = hours > 0 ? `${hours}h` : '';
        minutes = minutes > 0 ? `${minutes}m` : '';

        customHour = configurations.customHours[hours + minutes];
        //If a custom string is specified return it
        if (customHour) {
          return customHour;
        } else {
          //Else return the normal string
          return hours + minutes;
        }
      } else {
        return `${configurations.maxHours} 59m`;
      }
    }

    return floatToFormat
  });
})();