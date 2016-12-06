/**
 * Created by gabriel.rohden on 06/12/2016.
 * A filter to convert the given valid values to the main format.
 */
(function () {
    'use strict';
    angular.module('GRHI').filter('floatToHourFormat', function(){
        //Float to XXh YYm  with checks
        return function floatToFormat(float, maxHours, maxString, minStr, baseMins){

            if(!baseMins) baseMins = 60;
            if(!maxHours) maxHours = Infinity;

            //is a valid float or integer?
            if(!(/^[0-9]*(\.|,)?[0-9]*$/i.test(float))) return float;

            float = Number((float + '').replace(',','.'));

            var minutes = ((float * baseMins) % baseMins).toFixed(0);
            var hours = Math.floor(float);

            //Checks if its the minutes
            if (minutes >= baseMins) {
                hours += (minutes / baseMins).toFixed(0);
            }

            console.log(hours,minutes);
            if(maxHours >= hours){
                //If result in zero omit or set floor.
                if (minutes <= 0 && hours <= 0) {
                    return minStr;
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