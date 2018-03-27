/*global app*/
/*global log*/
app.controller('usersCtl', ['$scope', '$routeParams', 'adminSrv', function ($scope, $params, admin) {
    'use strict';
    $scope.chars = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
                   'V', 'W', 'X', 'Y', 'Z'];
    $scope.users = 0;
    if (typeof $params.id !== 'undefined') {
        log($params);
        $scope.campus = 1;
    } else {
        $scope.campus = 0;
        $scope.title = 'Institutions';
    }
    $scope.view = function (id) {
        $scope.users = id;
    };
}]);
