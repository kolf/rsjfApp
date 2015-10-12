define(
    ['angular',
        'ngRoute',
        'ngStorage',
        'services',
        'directives',
        'filters',
        'controllers'
    ],

    function(angular, ngRoute, ngStorage, Services, Directives, Filters) {
        var initialize = function () {

            var app = angular.module('rsjfApp', ['ngRoute','ngStorage']).config(['$routeProvider', function ($routeProvider) {

                $routeProvider.when('/', {
                    templateUrl: '/views/confirm_pay_1.html',
                    controller: ConfirmPay1Ctrl,
                    controllerAs:'vm'
                }).
                when('/bind', {
                    templateUrl: '/views/bind.html',
                    controller: BindCtrl,
                    controllerAs:'vm'
                }).
                when('/provinceList', {
                    templateUrl: '/views/provinceList.html',
                    controller: provinceListCtrl,
                    controllerAs:'vm'
                }).
                when('/cityList', {
                    templateUrl: '/views/cityList.html',
                    controller: cityListCtrl,
                    controllerAs:'vm'
                }).
                when('/confirm_pay_2', {
                    templateUrl: '/views/confirm_pay_2.html',
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