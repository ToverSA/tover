/*global app*/
/*global log*/
/*global $*/
app.controller('authCtl', ['$scope', 'httpFacade', function ($scope, httpFacade) {
    'use strict';
    $scope.auth = function (e) {
        httpFacade.auth($.param(e));
    };
    $scope.$on('NO_AUTH', function () {
        $scope.isAuth = false;
    });
    $scope.$on('AUTH', function () {
        $scope.isAuth = true;
    });
    $scope.isAuth = true;
}]);
