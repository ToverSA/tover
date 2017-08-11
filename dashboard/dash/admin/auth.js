/*global app*/
/*global log*/
/*global $*/
app.controller('authCtl', ['$scope', '$location', 'httpFacade', function ($scope, $location, httpFacade) {
    'use strict';
    $scope.auth = function (e) {
        httpFacade.auth($.param(e));
    };
    $scope.$on('NO_AUTH', function () {
        $scope.isAuth = false;
    });
    $scope.$on('AUTH', function () {
        $scope.isAuth = true;
        $location.url($location.url());
    });
    $scope.isAuth = true;
}]);
