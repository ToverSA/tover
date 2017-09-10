/*global app*/
/*global log*/
/*global $*/
app.controller('verifyCtl', ['$scope', '$location', '$routeParams', 'httpFacade', function ($scope, $location, $params, httpFacade) {
    'use strict';
    $scope.accState = 1;
    $scope.sendVerification = function () {
        $scope.$emit('START_LOADING');
        httpFacade.sendVerification($.param({email: $params.email})).then(function (res) {
            $scope.$emit('STOP_LOADING');
            $location.url('/account');
            log(res.data);
        }, function (err) {
            $scope.$emit('STOP_LOADING');
        });
    };
    if ($params.from === 'register') {
        httpFacade.sendVerification($.param({email: $params.email})).then(function (res) {
            $scope.$emit('STOP_LOADING');
            log(res.data);
        });
    } else {
        $scope.$emit('STOP_LOADING');
    }
}]);
