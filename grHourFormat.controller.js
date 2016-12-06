/**
 * Created by gabriel.rohden on 30/11/2016.
 */
(function(){
    'use strict';
    angular.module('GRHI').controller('grTimeInputController',grTimeInputController);

    function grTimeInputController($scope,floatToHourFormatFilter){

        var baseMins = 60; //base calculations
        var maxMins = 59; //max
        var maxHours =  $scope.maxHour ? $scope.maxHour : Infinity;
        var convertToMinsPoint = 23;
        var maxString = maxHours+'h 59m';


        //Inicia o valor ja convertido esperado vindo em miliseconds
        if($scope.expected == 'miliseconds') {
            $scope.ngModel = getReadableTime(
                $scope.ngModel / 60 / 1000,
                $scope.maxHour
            );
        }

        $scope.validateAndParseDateFormat = function ($event) {
            var readable = getReadableTime (
                $event.currentTarget.value.trim(),
                $scope.maxHour
            );

            //se a key do model vem indefinida, quer dizer que a pattern nao deu match. alterar o value vai faze-la desaparecer na view
            if ($scope.ngModel !== undefined) {
                $scope.ngModel = readable;
            }
        };

        /**
         * TODO:Document this.
         */
        function getReadableTime(value) {
            //console.debug.apply(this,arguments);
            //Se o model esta vazio, tenta retornar o valor da view
            if (value === undefined) {
                return false;
            }

            //The intention is to convert everyone to float, make the validations and convert to the format.

            //XX:YY to float
            if(/^[0-9]*:[0-9]*?$/i.test(value)){
                var splited = value.split(':');
                var minutes = Number(splited[0]);
                var hours = Number(splited[1]);

                minutes = isNaN(minutes) ? 0 : minutes;
                hours = isNaN(hours) ? 0 : hours;

                value = minutes+(hours/baseMins);
            }

            //XXh YY[m] to float
            if(/^[1-9]+[0-9]*h\s*[0-9]*m?$/i.test(value)){
                value = getHourAndMinuteToFloat(value);
            }

            return floatToHourFormatFilter(value, baseMins, maxHours, maxString);
        }


        //XXh YYm to float
        function getHourAndMinuteToFloat(strValue){
            strValue = (strValue)
                .toString()
                .trim()
                .replace(/\s/g, '')
                .replace('m','')
                .split('h');

            return Number(strValue[0]) + (Number(strValue[1])/baseMins);
        }

    }
})();
