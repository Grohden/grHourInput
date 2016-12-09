/**
 * Created by gabriel.rohden on 06/12/2016.
 * A filter and its models to convert the given valid values to the main format.
 */

//FIXME: This should be in another place?

/** A filter option model */
function FilterOptionModel(maxHours, baseMins, minString, maxString){
    this.maxHours   = maxHours;
    this.baseMins   = baseMins;
    this.maxString  = maxString;
    this.minString  = minString;
}

function defaultOptions(){
    return new FilterOptionModel(Infinity,60);
}

(function () {
    'use strict';
    angular.module('GRHI').filter('floatToHourFormat', function(){
        /**
         * Float to XXh YYm  with checks
         * @param float {Number} float to be converted
         * @param options - a {@link FilterOptionModel} option.
         */
        return function floatToFormat(float, options){


            if (!options) options = {};

            var maxHours  = options.maxHours || Infinity;
            var baseMins  = options.baseMinutes || 60;
            var maxString = options.maxString || options.maxHours + 'h 59m';
            var minString = options.minString;

            //Default conversions options(nope, don't use /=, is a wrong option)
            switch(options.expected){
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

            //is a valid float or integer?
            if(!(/^[0-9]*(\.|,)?[0-9]*$/i.test(float))) return float;

            //comma support
            float = Number((float + '').replace(',','.'));

            var minutes =  Number(((float * baseMins) % baseMins).toFixed(0));
            var hours = Math.floor(Number(float));

            //Checks if its the minutes should be converted to hours.
            if (minutes >= baseMins) {
                hours += Number((minutes / baseMins).toFixed(0));
                minutes = 0;
            }

            if(maxHours >= hours){
                //If result in zero omit or set floor.
                if (minutes <= 0 && hours <= 0) {
                    return minString;
                }

                //Just for the space between.
                if(hours>0 && minutes>0){
                    return hours+'h '+minutes+'m';
                }

                //else it does'nt have space.
                hours = hours>0 ? hours+'h' : '';
                minutes =  minutes>0 ? minutes+'m' : '';

                return hours+minutes;
            } else {
                return maxString;
            }

        }
    });
})();