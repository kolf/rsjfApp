// Require JS  Config File

require.config({
    baseUrl: 'scripts/',
    paths : {
        //'zepto':'vendor/zepto',
        'angular' : 'vendor/angular.min',
        'ngRoute':'vendor/angular-route.min',
        'ngStorage':'https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.9/ngStorage.min'
    },
    shim : {
        //'zepto':{
        //    exports: '$'
        //},
        'angular': {
            exports: 'angular' 
        },
        'ngRoute': {
            exports: 'ngRoute',
            deps: ['angular']
        },
        'ngStorage': {
            exports: 'ngStorage',
            deps: ['angular']
        }
    }
});


require(['app'],
    function(App) {
        App.initialize();
    }
);