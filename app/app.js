/*global angular*/
var app = angular.module('akomo', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
        .when('/n',
            {
                templateUrl: 'app/partials/home.html'
            })
        .when('/account',
            {
                templateUrl: 'app/partials/account.html',
                controller: 'accountCtl'
            })
        .otherwise({
            redirectTo: '/account'
        });
}]);
app.config(["$httpProvider", function ($httpProvider) {
    "use strict";
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}]);
