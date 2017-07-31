/*global angular*/
function log(str) {
    'use strict';
    window.console.log(str);
}
var app = angular.module('akomo', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
        .when('/',
            {
                templateUrl: 'app/landing/landing.html',
                controller: 'landingCtl'
            })
        .when('/home',
            {
                templateUrl: 'app/home/home.html',
                controller: 'homeCtl'
            })
        .when('/account',
            {
                templateUrl: 'app/account/account.html',
                controller: 'accountCtl'
            })
        .when('/account/:q',
            {
                templateUrl: 'app/account/account.html',
                controller: 'accountCtl'
            })
        .when('/account/delete',
            {
                templateUrl: 'app/account/delete.html'
            })
        .when('/ads/create',
            {
                templateUrl: 'app/ads/create.html',
                controller: 'adsCreateCtl'
            })
        .when('/search',
            {
                templateUrl: 'app/search/search.html',
                controller: 'adsSearchCtl'
            })
        .when('/search/:q',
            {
                templateUrl: 'app/search/search.html',
                controller: 'adsSearchCtl'
            })
        .when('/ads/:id',
            {
                templateUrl: 'app/ads/ads.html',
                controller: 'adsCtl'
            })
        .when('/faqs',
            {
                templateUrl: 'app/faqs/faqs.html',
                controller: 'faqsCtl'
            })
        .when('/faqs/:section',
            {
                templateUrl: 'app/partials/faqs.html',
                controller: 'faqsCtl'
            })
        .when('/messenger',
            {
                templateUrl: 'app/messenger/messenger.html',
                controller: 'messengerCtl'
            })
        .when('/messenger/:q',
            {
                templateUrl: 'app/messenger/messenger.html',
                controller: 'messengerCtl'
            })
        .otherwise({
            templateUrl: 'app/404/404.html',
            controller: 'notFoundCtl'
        });
}]);
app.config(["$httpProvider", function ($httpProvider) {
    'use strict';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}]);
app.config(['$locationProvider', function ($locationProvider) {
    'use strict';
    $locationProvider.html5Mode(true);
//Optional
}]);