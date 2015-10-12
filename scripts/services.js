'use strict';

/* Services */

define([], function () {

    var services = {};
    services.HttpService = function ($http) {
        return function(options){
            options.data.platformType='3';
            options.loading=true;

            if(options.loading){
                console.log('loading show')
            }
            return $http({
                method: 'post',
                url: options.url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data:options.data
            }).success(function(data){
                if(options.loading){
                    console.log('loading hide')
                }
            })
        };
    };

    return services;

});
