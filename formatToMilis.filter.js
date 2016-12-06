/**
 * Created by gabriel.rohden on 06/12/2016.
 * A filter to convert back the values from the module format to miliseconds
 */
(function () {
    'use strict';
    angular.module('GRHI').filter('formatToMilis', function(){
        //Float to XXh YYm  with checks
        return function getHourFormatToMilis(input){
            input+='';
            var list = [0,0];
            var skip = false;
            if(input.match(/m/i) && input.match(/h/i)){
                skip = true;
                list = input
                    .replace(/m/i,'')
                    .split(/h/i);
            }

            if(input.match(/h/i) && !skip){
                list[0] = input.replace(/h/i,'');
            }

            if(input.match(/m/i) && !skip){
                list[1] = input.replace(/m/i,'');
            }

            return (Number(list[0])+(Number(list[1])/60))*60*60*1000;
        }
    });
})();