// Require JS  Config File

require.config({
    baseUrl: 'js/',
    paths : {
        //'zepto':'lib/zepto',
        'angular' : 'lib/angular',
        'ngRoute':'lib/angular-route',
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