/*global app*/
/*global log*/
app.controller('authCtl', ['$scope', 'httpFacade', function ($scope, httpFacade) {
    'use strict';
    log('loaded');
    $scope.auth = function (e) {
        log(e);
    };
}]);
