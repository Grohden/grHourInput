/**
 * Created by gabriel.rohden on 30/11/2016.
 */
(function () {
    'use strict';
    /*global angular*/
    angular.module('Demo', ['GRHI'])
        .controller('demoController',function ($scope, $interval) {
            $scope.milliSeconds = 3600000;
            $scope.hourString = "25h 10m";

            function updateCurrentDayMillis() {
                console.debug('updating');
                var date = new Date();
                $scope.currentDayMillis = (date.getHours()+(date.getMinutes()/60))*60*60*1000;
            }

            //Make first update happen
            updateCurrentDayMillis();

            $interval(updateCurrentDayMillis,5000);
        });
}());