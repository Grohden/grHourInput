/**
 * Created by gabriel.rohden on 30/11/2016.
 */
(function () {
    'use strict';
    /*global angular*/
    angular.module('Demo', ['GRHI'])
        .controller('demoController',function ($scope) {
            $scope.milliSeconds = 3600000;
            $scope.hourString = "25h 10m";
        });
}());