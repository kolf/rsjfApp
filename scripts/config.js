// Require JS  Config File

require.config({
    baseUrl: 'scripts/',
    paths : {
        //'zepto':'vendor/zepto',
<<<<<<< HEAD:scripts/config.js
        'angular' : 'vendor/angular.min',
        'ngRoute':'vendor/angular-route.min',
=======
        'angular' : 'vendor/angular',
        'ngRoute':'vendor/angular-route',
>>>>>>> ded8c766eaf2135b0a3e2897382e95338c1ea055:scripts/config.js
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