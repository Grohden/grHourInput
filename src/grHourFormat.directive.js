/**
 * Created by gabriel.rohden on 30/11/2016.
 * The main module principal directive.
 */
(function () {
    'use strict';
    /*global angular, console*/
    angular.module('GRHI').directive(
        'grHourInput', function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: 'app/grHourInput/src/hour.input.template.html',
                controller: 'grHourInputController',
                link: grHourInputLink,
                scope: {
                    ngModel: '=',
                    maxHour: '=',
                    preventEnter: '@', //This should be a regex to check for any keys..
                    expected: '@',
                    minString:'@'
                }
            }
        }
    );

    function grHourInputLink(scope, elm, attrs) {
        //All required attributes..
        var requiredAttrs = [
            "ngModel"
        ];

        if (scope.preventEnter == 'true') {
            elm.on('keypress',
                function (e) {
                    if (e.key == "Enter") e.preventDefault();
                });
        }

        //Checks if the required attributes are specified.
        for (var key in attrs) {
            if (requiredAttrs.indexOf(key) != -1) {
                requiredAttrs.splice(requiredAttrs.indexOf(key), 1);
            }
        }

        if (requiredAttrs.length) {
            //Should be a warning?
            throw new Error(requiredAttrs.join(", ") + " are/is required to the directive work properly!");
        }
    }
}());