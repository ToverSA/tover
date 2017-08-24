/*global app*/
/*global log*/
/*global $*/
app.controller('recoverCtl', ['$scope', '$location', 'httpFacade', function ($scope, $location, httpFacade) {
    'use strict';
    $scope.accState = 1;
    $scope.back = function () {
        $location.url('/account');
    };
    $scope.recover = function (e) {
        httpFacade.recover($.param({email: e})).then(function (res) {
            $location.url('/account');
        });
    };
}]);
