/*global app*/
/*global log*/
app.controller('recoverCtl', ['$scope', function ($scope) {
    'use strict';
    $scope.recover = function () {
//        log('rec' + email);
        log('rec' + $scope.em);
    };
}]);