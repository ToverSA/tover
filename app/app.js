/*global angular*/
var app = angular.module('akomo', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
        .when('/',
            {
                templateUrl: 'app/partials/home.html'
            })
        .otherwise({
            redirectTo: '/'
        });
}]);
