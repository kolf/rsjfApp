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
                }).
                when('/agreement', {
                    templateUrl: '/views/agreement_1.html',
                    controller: AgreementCtrl,
                    controllerAs:'vm'
                }).
                when('/setPassword', {
                    templateUrl: '/views/setPassword.html',
                    controller: SetPasswordCtrl,
                    controllerAs:'vm'
                }).
                when('/payResult', {
                    templateUrl: '/views/payResult.html',
                    controller: PayResultCtrl,
                    controllerAs:'vm'
                }).
                when('/payResultInfo', {
                    templateUrl: '/views/payResultInfo.html',
                    controller: PayResultInfoCtrl,
                    controllerAs:'vm'
                }).
                when('/cardInfo', {
                    templateUrl: '/views/cardInfo.html',
                    controller: CardInfoCtrl,
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