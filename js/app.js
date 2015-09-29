define(
    ["angular",
        "ngRoute",
        "Services/services",
        "Directives/directives",
        "Filters/filters",
        "Controllers/controllers"
    ],

    function(angular, ngRoute, Services, Directives, Filters) {
        var initialize = function () {

            var app = angular.module('myApp', ['ngRoute']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

                $routeProvider.when('/', {
                    templateUrl: '/templates/Main.html',
                    controller: MainCtrl
                });

                $routeProvider.otherwise({redirectTo: '/'});

                $locationProvider.html5Mode(true);

            }]);

            Filters.initialize(app);

            app.factory(Services);
            app.directive(Directives);

            angular.bootstrap(document, ["myApp"]);

        };
        return {
            initialize: initialize
        };
    });