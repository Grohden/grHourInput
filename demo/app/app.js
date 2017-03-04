/**
 * Created by Gabriel Rohden on 30/11/2016.
 * Demo controller
 */
(function () {
    'use strict';
    /*global angular*/
    angular
        .module('Demo', ['GRHI'])
        .controller('demoController', function ($interval) {
            let demo = this;
            demo.milliSeconds = 3600000;
            demo.hourString = "25h 10m";
            demo.milliSecondsConfigurations = {
                expected: 'milliseconds',
                minString: 'custom string for zero',
                customHours: {
                    "3h": ""
                }
            };
            demo.mainInputOptions = {
                customHours: {
                    "10h 30m": "Hello there",
                    "10h 31m": "Ginurul Kinub"
                },
            };


            function updateCurrentDayMillis() {
                var date = new Date();
                demo.currentDayMillis = (date.getHours() + (date.getMinutes() / 60)) * 60 * 60 * 1000;
            }

            //Make first update happen
            updateCurrentDayMillis();

            $interval(updateCurrentDayMillis,5000);
        });
}());