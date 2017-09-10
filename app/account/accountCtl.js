/*global app*/
/*global log*/
/*global $*/
app.controller('accountCtl', ['$scope', '$http', '$location', '$routeParams', 'AppStore', function ($scope, $http, $location, $routeParams, AppStore) {
    'use strict';
    $scope.error = {};
    $scope.logout = function () {
        AppStore.clearAll();
        $location.url('/home');
    };
    $scope.$on('STOP_LOADING', function () {
        $scope.loading = false;
    });
    $scope.$on('START_LOADING', function () {
        $scope.loading = true;
    });
    $scope.$on('ERROR', function (evt, obj) {
        $scope.error.title = 'Error : ' + obj.code;
        $scope.error.description = obj.desc;
        $scope.error.showing = true;
    });
    $scope.closeErrDialog = function () {
        $scope.error.showing = false;
    };
    $scope.toRecovery = function () { $location.url('/account?rel=recovery'); };
    $scope.toRegister = function () { $location.url('/account?rel=register'); };
    $scope.toLogin = function () { $location.url('/account?rel=login'); };
    $scope.toPrefs = function () { $location.url('/account?rel=prefs'); };
    if (typeof $routeParams.rel === 'undefined') {
        if (AppStore.isToken()) {
            $routeParams.rel = 'console';
            $location.search($routeParams);
        } else {
            $routeParams.rel = 'login';
            $location.search($routeParams);
        }
    } else if ($routeParams.rel === 'console') {
        if (AppStore.isToken()) {
            $scope.section = 'console';
        } else {
            $routeParams.rel = 'login';
            $location.search($routeParams);
        }
    } else if ($routeParams.rel === 'prefs') {
        if (AppStore.isToken()) {
            $scope.section = 'prefs';
        } else {
            $routeParams.rel = 'login';
            $location.search($routeParams);
        }
    } else if ($routeParams.rel === 'login') {
        if (AppStore.isToken()) {
            $routeParams.rel = 'console';
            $location.search($routeParams);
        } else {
            $scope.section = 'login';
        }
    } else if ($routeParams.rel === 'register') {
        if (AppStore.isToken()) {
            $routeParams.rel = 'console';
            $location.search($routeParams);
        } else {
            $scope.section = 'register';
        }
    } else if ($routeParams.rel === 'recovery') {
        if (AppStore.isToken()) {
            $routeParams.rel = 'console';
            $location.search($routeParams);
        } else {
            $scope.section = 'recovery';
        }
    } else if ($routeParams.rel === 'verify') {
        if (AppStore.isToken()) {
            $routeParams.rel = 'console';
            $location.search($routeParams);
        } else {
            $scope.section = 'verify';
        }
    } else {
        $location.url('/account');
    }
}]);
