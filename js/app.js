define(
    ['angular',
        'ngRoute',
        'ngStorage',
        'Services/services',
        'Directives/directives',
        'Filters/filters',
        'Controllers/controllers' 
    ],

    function(angular, ngRoute, ngStorage, Services, Directives, Filters) {
        var initialize = function () {

            var app = angular.module('rsjfApp', ['ngRoute','ngStorage']).config(['$routeProvider', function ($routeProvider) {

                $routeProvider.when('/', {
                    templateUrl: '/templates/confirm_pay_1.html',
                    controller: ConfirmPay1Ctrl,
                    controllerAs:'vm'
                }).
                when('/bind', {
                    templateUrl: '/templates/bind.html',
                    controller: BindCtrl,
                    controllerAs:'vm'
                }).
                when('/confirm_pay_2', {
                    templateUrl: '/templates/confirm_pay_2.html',
                    controller: ConfirmPay2Ctrl,
                    controllerAs:'vm'
                });

                $routeProvider.otherwise({redirectTo: '/'});


            }]);

            Filters.initialize(app);

            app.factory(Services);
            app.directive(Directives);

            angular.bootstrap(document, ['rsjfApp']);

        };
        return {
            initialize: initialize
        };
    });