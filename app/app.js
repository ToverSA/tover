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
                templateUrl: 'app/partials/home.html',
                controller: 'homeCtl'
            })
        .when('/account',
            {
                templateUrl: 'app/partials/account.html',
                controller: 'accountCtl'
            })
        .when('/account/ads/:id',
            {
                templateUrl: 'app/partials/account-ads.html',
                controller: 'accountAdsCtl'
            })
        .when('/account/delete',
            {
                templateUrl: 'app/partials/delete.html'
            })
        .when('/ads/create',
            {
                templateUrl: 'app/partials/create.html',
                controller: 'adsCreateCtl'
            })
        .when('/ads/search',
            {
                templateUrl: 'app/partials/search.html',
                controller: 'adsSearchCtl'
            })
        .when('/ads/search/:q',
            {
                templateUrl: 'app/partials/search.html',
                controller: 'adsSearchCtl'
            })
        .when('/ads/:id',
            {
                templateUrl: 'app/partials/ads.html',
                controller: 'adsCtl'
            })
        .when('/faqs',
            {
                templateUrl: 'app/partials/ads.html',
                controller: 'adsCtl'
            })
        .when('/faqs/:section',
            {
                templateUrl: 'app/partials/faqs.html',
                controller: 'faqsCtl'
            })
        .otherwise({
            redirectTo: '/'
        });
}]);
app.config(["$httpProvider", function ($httpProvider) {
    "use strict";
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}]);
