/*global angular*/
function log(str) {
    'use strict';
    window.console.log(str);
}
var app = angular.module('dashboard', ['ngRoute', 'ngCookies']).config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
        .when('/',
            {
                templateUrl: 'dash/home/home.html',
                controller: 'homeCtl'
            })
        .when('/login',
            {
                templateUrl: 'dash/login/login.html',
                controller: 'loginCtl'
            })
        .when('/campuses',
            {
                templateUrl: 'dash/campuses/campuses.html',
                controller: 'campusesCtl'
            })
        .when('/campuses/:id',
            {
                templateUrl: 'dash/campuses/campuses.html',
                controller: 'campusesCtl'
            })
        .when('/users',
            {
                templateUrl: 'dash/users/users.html',
                controller: 'usersCtl'
            })
        .when('/users/:id',
            {
                templateUrl: 'dash/users/users.html',
                controller: 'usersCtl'
            })
        .when('/adverts',
            {
                templateUrl: 'dash/ads/ads.html',
                controller: 'adsCtl'
            })
        .when('/adverts:id',
            {
                templateUrl: 'dash/ads/ads.html',
                controller: 'adsCtl'
            })
        .when('/404',
            {
                templateUrl: 'dash/partials/404.html',
                controller: 'notFoundCtl'
            })
        .otherwise({
            redirectTo: '/404'
        });
}]);
app.config(["$httpProvider", function ($httpProvider) {
    "use strict";
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}]);
app.config(['$locationProvider', function ($locationProvider) {
    'use strict';
//    $locationProvider.html5Mode(true);
}]);
