/**
 * Created by gabriel.rohden on 30/11/2016.
 * The main module principal directive.
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
                    preventEnter: '@', //This should be a regex to check for any keys..
                    expected: '@',
                    minString:'@'
                }
            }
        }
    );

    function grTimeInputLink(scope, elm, attrs) {
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

        for (var key in attrs) {
            if (requiredAttrs.indexOf(key) != -1) {
                requiredAttrs.splice(requiredAttrs.indexOf(key), 1);
            }
        }
        if (requiredAttrs.length) {
            //Should be a warning?
            throw new Error(requiredAttrs.join(", ") + " is required to the directive work properly!");
        }
    }
}());