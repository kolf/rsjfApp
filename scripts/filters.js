'use strict';

/* Filters */

define([], function () {

    function initialize(app) {
        app.filter('bankNumber', function(){
            return function(text,type){
                var prefix='';
                if(type && type=='*'){
                    prefix='**** **** **** '
                }else{
                    prefix='尾号'
                }
                return prefix+text.match(/\d{4}$/)
            }
        });


        //app.filter('curr',function(){
        //    return function(content,unit){
        //        return unit+content;
        //    }
        //});

    }

    return {initialize: initialize};
});
