/**
 * Created by gabriel.rohden on 06/12/2016.
 * A filter to convert back the values from the module format to milliseconds
 */
(function () {
    'use strict';
    angular.module('GRHI').filter('formatToMillis', function(){
        //Float to XXh YYm  with checks
        return function getHourFormatToMillis(input){
            input+='';
            let list = [0, 0];
            let skip = false;
            if(input.match(/m/i) && input.match(/h/i)){
                skip = true;
                list = input
                    .replace(/m/i,'')
                    .split(/h/i);
            }

            if (!skip && input.match(/h/i)) {
                list[0] = input.replace(/h/i,'');
            }

            if (!skip && input.match(/m/i)) {
                list[1] = input.replace(/m/i,'');
            }

            return (Number(list[0])+(Number(list[1])/60))*60*60*1000;
        }
    });
})();