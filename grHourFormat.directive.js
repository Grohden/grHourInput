/**
 * Created by gabriel.rohden on 30/11/2016.
 */
(function () {
    'use strict';
    /*global angular, console*/
    angular.module('GRHI').directive(
        'grTimeInput', function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: 'app/grTimeInput/time.input.template.html',
                controller: 'grTimeInputController',
                link: grTimeInputLink,
                scope: {
                    ngModel: '=',
                    maxHour: '=',
                    expected: '@'
                }
            }
        }
    );

    function grTimeInputLink(scope, elm, attrs) {
        //All required attributes..
        var requiredAttrs = [
            "ngModel"
        ];

        for (var key in attrs) {
            if (requiredAttrs.indexOf(key) != -1) {
                requiredAttrs.splice(requiredAttrs.indexOf(key), 1);
            }
        }
        if (requiredAttrs.length) {
            throw new Error(requiredAttrs.join(", ") + " is required to the directive work properly!");
        }
    }
}());