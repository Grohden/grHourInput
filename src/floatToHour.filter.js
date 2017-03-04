/**
 * Created by gabriel.rohden on 06/12/2016.
 * A filter and its models to convert the given valid values to the main format.
 */

/*global angular*/

(function () {
    'use strict';

    angular.module('GRHI').filter('floatToHourFormat', function(){
        const baseMinutes = 60;
        /**
         * Float to XXh YYm  with checks
         * @param float {Number} float to be converted
         * @param options - a {@link FilterOptionModel} option.
         */
        return function floatToFormat(float, options){

            let configurations = angular.extend({
                maxHours: Infinity,
                customHours: {}
            }, options);

            //Default conversions options(nope, don't use /=, is a wrong option)
            switch (configurations.expected) {
                case 'milliseconds':
                    float = float / 60 / 60 / 1000;
                    break;
                case 'seconds':
                    float = float / 60 / 60;
                    break;
                case 'minutes':
                    float = float / 60;
                    break;
            }

            //is a invalid float or integer?
            if (!(/^[0-9]*(\.|,)?[0-9]*$/i.test(float))) {
                return float;
            }

            //comma support
            float = Number((float + '').replace(',','.'));

            let minutes = Number(((float * baseMinutes) % baseMinutes).toFixed(0));
            let hours = Math.floor(Number(float));

            //Checks if its the minutes should be converted to hours.
            if (minutes >= baseMinutes) {
                hours += Number((minutes / baseMinutes).toFixed(0));
                minutes = 0;
            }

            if (hours <= configurations.maxHours) {
                //If result in zero omit or set floor.
                if (minutes <= 0 && hours <= 0) {
                    let format = "0h 0m";
                    let customHour = configurations.customHours[format];
                    if (customHour) {
                        return customHour;
                    } else {
                        return format;
                    }
                }

                //Just for the space between.
                if(hours>0 && minutes>0){
                    let format = `${hours}h ${minutes}m`;
                    let customHour = configurations.customHours[format];
                    if (customHour) {
                        return customHour;
                    } else {
                        return format;
                    }
                }

                //else it does'nt have space.
                hours = hours > 0 ? `${hours}h` : '';
                minutes = minutes > 0 ? `${minutes}m` : '';

                let customHour = configurations.customHours[hours + minutes];
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
    });
})();