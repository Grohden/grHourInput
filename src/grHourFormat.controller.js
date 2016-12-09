/**
 * Created by gabriel.rohden on 30/11/2016.
 * The main module directive controller.
 */
(function(){
    'use strict';
    angular.module('GRHI').controller('grHourInputController',['$scope', 'floatToHourFormatFilter',grHourInputController]);

    function grHourInputController($scope,floatToHourFormatFilter){

        //Define on scope for two way binding.
        $scope.baseMinutes           = 60;
        $scope.maxMinutes            = 59;
        $scope.maxHours              = $scope.maxHour || Infinity;
        $scope.maxString             = $scope.maxString || $scope.maxHour+'h 59m';
        $scope.convertToMinutesPoint = 23;
        //$scope.minString


        //Init the value converted to hours.
        if($scope.expected == 'milliseconds') {
            $scope.ngModel = getReadableTime(
                $scope.ngModel / 60 / 1000, //FIXME: this is wrong, isn't?
                $scope
            );
        }

        $scope.validateAndParseDateFormat = function ($event) {
            var readable = getReadableTime (
                $event.currentTarget.value.trim(),
                $scope
            );

            if ($scope.ngModel !== undefined) {
                $scope.ngModel = readable;
            }
        };

        /**
         * TODO:Document this.
         */
        function getReadableTime(value,options) {
            //console.debug.apply(this,arguments);

            if (value === undefined) {
                return;
            }

            //The intention is to convert everyone to float, make the validations and then, convert to the format.

            //XX:YY to float
            if(/^[0-9]*:[0-9]*?$/i.test(value)){

                var separated = value.split(':');

                var minutes   = Number(separated[0]);
                var hours     = Number(separated[1]);

                minutes = isNaN(minutes) ? 0 : minutes;
                hours   = isNaN(hours)   ? 0 : hours;

                value = minutes+(hours/options.baseMinutes);
            }

            //XXh YY[m] to float
            if(/^[1-9]+[0-9]*h\s*[0-9]*m?$/i.test(value)){
                value = getHourAndMinuteToFloat(value, options.baseMinutes);
            }

            //Hours or minutes
            if(/^[1-9]+[0-9]*(h|m)$/i.test(value)){
                value = getHourOrMinuteToFloat(value, options.baseMinutes);
            }

            return floatToHourFormatFilter(value, options);
        }

        function getHourOrMinuteToFloat(strValue,baseMinutes){
            strValue+='';

            if(strValue.match(/m/i)){
                return Number(strValue.replace(/m/i,'')/baseMinutes);
            }

            if(strValue.match(/h/i)){
                return Number(strValue.replace(/h/i,''));
            }
        }

        //XXh YYm to float
        function getHourAndMinuteToFloat(strValue,baseMinutes){
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