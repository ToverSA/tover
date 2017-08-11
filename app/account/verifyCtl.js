/*global app*/
/*global log*/
/*global $*/
app.controller('verifyCtl', ['$scope', '$location', '$routeParams', 'httpFacade', function ($scope, $location, $params, httpFacade) {
    'use strict';
    log($params);
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
        });
    } else {
        $scope.$emit('STOP_LOADING');
    }
}]);
