/*global app*/
/*global log*/
app.directive('header', ['$location', 'AppStore', function ($location, AppStore) {
    'use strict';
    return {
        restrict: 'A',
        templateUrl: 'app/header/header.html',
        replace: true,
        scope: {
            account: '@'
        },
        link: function (scope, element, attrs) {
            scope.logout = function () {
                AppStore.clearAll();
                $location.url('/home');
                scope.name = null;
            };
            if (typeof scope.account === 'undefined') {
                scope.account = false;
            }
            if (AppStore.isToken()) {
                scope.name = AppStore.getUserName();
            }
            scope.toSearch = function () {
                $location.url('/search');
            };
            scope.toAccount = function () {
                $location.url('/account');
            };
            scope.toHome = function () {
                if (AppStore.isNew()) {
                    $location.url('/');
                } else {
                    $location.url('/home');
                }
            };
            scope.$on('NAME_SET', function (evt) {
                scope.name = AppStore.getUserName();
            });
        }
    };
}]);
