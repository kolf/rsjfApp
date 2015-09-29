// Require JS  Config File

require.config({
    baseUrl: 'js/',
    paths : {
        'zepto':'lib/zepto.js',
        'angular' : 'lib/angular',
        'ngRoute':'lib/angular-route'
    },
    shim : {
        'zepto':{
            exports: '$'
        },
        'angular': {
            exports: 'angular'
        },
        'ngRoute': {
            exports: 'ngRoute',
            deps: ['angular']
        }
    }
});


require(['app'],
    function(App) {
        App.initialize();
    }
);