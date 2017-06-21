/*global app*/
/*global log*/
app.directive('header', ['$location', function ($location) {
    'use strict';
    return {
        restrict: 'A',
        templateUrl: 'app/header/header.html',
        replace: true,
        scope: {
            account: '@'
        },
        link: function (scope, element, attrs) {
            if (typeof scope.account === 'undefined') {
                scope.account = false;
            }
            scope.toSearch = function () {
                $location.url('/search');
            };
            scope.toAccount = function () {
                $location.url('/account');
            };
            scope.toHome = function () {
                $location.url('/home');
            };
        }
    };
}]);