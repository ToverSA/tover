/*global app*/
/*global log*/
app.controller('verifyCtl', ['$scope', '$routeParams', 'httpFacade', function ($scope, $params, httpFacade) {
    'use strict';
    log($params);
    $scope.sendVerification = function () {
        log('verifying');
        httpFacade.sendVerification().then(function (res) {
            log(res.data);
        });
    };
}]);
