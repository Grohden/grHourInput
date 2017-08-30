/**
 * Created by Gabriel Rohden on 30/11/2016.
 * The main module directive controller.
 */
(function(){
    'use strict';
    /* global angular */
    angular.module('GRHI').controller('grHourInputController', ['$scope', 'floatToHourFormatFilter', grHourInputController]);

    function grHourInputController($scope, floatToHourFormatFilter) {

        const baseMinutes = 60;

        if (!$scope.options) {
            $scope.options = {};
        }

        //Init the value converted to hours.
        if ($scope.options.expected == 'milliseconds') {
            $scope.ngModel = getReadableTime(
                $scope.ngModel / 60 / 1000, //FIXME: this is wrong, isn't?
                $scope.options
            );
        }


        //FIXME use controller as
        $scope.validateAndParseDateFormat = function ($event) {
            let readable = getReadableTime(
                $event.currentTarget.value.trim(),
                $scope.options
            );

            if ($scope.ngModel !== undefined) {
                $scope.ngModel = readable;
            }
        };

        /**
         * Get the readable time
         * @param {String | Number} value
         * @param {Object} options Options object for floatToHourFilter
         * @return {String | undefined} Return the readable format if is a valid value,
         * and if specified on options return the custom for 0 string, if the value is undefined it returns undefined
         */
        function getReadableTime(value, options) {
            //console.debug.apply(this,arguments);

            if (value === undefined) {
                return;
            }

            //The intention is to convert everyone to float, make the validations and then, convert to the format.

            //XX:YY to float
            if(/^[0-9]*:[0-9]*?$/i.test(value)){

                let separated = value.split(':');

                let minutes = Number(separated[0]);
                let hours = Number(separated[1]);

                minutes = isNaN(minutes) ? 0 : minutes;
                hours   = isNaN(hours)   ? 0 : hours;

                value = minutes + (hours / baseMinutes);
            }

            //XXh YY[m] to float
            if(/^[1-9]+[0-9]*h\s*[0-9]*m?$/i.test(value)){
                value = getHourAndMinuteToFloat(value);
            }

            //Hours or minutes
            if(/^[1-9]+[0-9]*(h|m)$/i.test(value)){
                value = getHourOrMinuteToFloat(value);
            }

            return floatToHourFormatFilter(value, options);
        }

        function getHourOrMinuteToFloat(strValue) {
            strValue+='';

            if(strValue.match(/m/i)){
                return Number(strValue.replace(/m/i,'')/baseMinutes);
            }

            if(strValue.match(/h/i)){
                return Number(strValue.replace(/h/i,''));
            }
        }

        //XXh YYm to float
        function getHourAndMinuteToFloat(strValue) {
            strValue = (strValue)
                .toString()
                .trim()
                .replace(/\s/g, '')
                .replace(/m/i,'') //TODO could put it on the above replace..
                .split(/h/i);

            return Number(strValue[0]) + (Number(strValue[1])/baseMinutes);
        }

    }
})();
