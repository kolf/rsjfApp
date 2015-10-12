'use strict';

/* Services */

define([], function () {

    var services = {};
    services.HttpService = function ($http) {
        return function(options){
            options.data.platformType='3';
            options.loading=true;
            return $http({
                method: 'post',
                url: options.url,
                params:options.data
            }).success(function(){
                console.log('loading')
            })
        };
    };

    return services;

});
