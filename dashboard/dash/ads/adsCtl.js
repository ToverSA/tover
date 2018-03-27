/*global app*/
/*global log*/
app.controller('adsCtl', ['$scope', '$routeParams', 'adminSrv', function ($scope, $params, admin) {
    'use strict';
    if (typeof $params.id !== 'undefined') {
        log($params);
        $scope.campus = 1;
    } else {
        $scope.campus = 0;
        $scope.title = 'Institutions';
    }
    $scope.open = function (id) {
        admin.toCampuses(id);
    };
}]);
