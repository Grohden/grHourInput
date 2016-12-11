/**
 * Created by gabriel.rohden on 30/11/2016.
 */
(function () {
    'use strict';
    /*global angular*/
    angular.module('Demo', ['GRHI'])
        .controller('demoController',function ($scope,floatToHourFormatFilter) {
            $scope.filterTest = 1.01;
            $scope.test="25h 10m";
        });
}());