/*global app*/
/*global log*/
/*global $*/
app.controller('campusesCtl', ['$scope', '$routeParams', 'adminSrv', 'httpFacade', function ($scope, $params, admin, httpFacade) {
    'use strict';
    if (typeof $params.id !== 'undefined') {
        log($params);
        $scope.campus = 1;
    } else {
        $scope.campus = 0;
        $scope.title = 'Institutions';
    }
    $scope.insti = {
        campuses: []
    };
    $scope.add = function (cname) {
        if (typeof cname !== 'undefined' && cname.length > 0) {
            $scope.insti.campuses.push(cname);
            $scope.cname = '';
        }
    };
    $scope.remove = function (id) {
        $scope.insti.campuses.splice(id, 1);
    };
    $scope.closeDialog = function () {
        $scope.dialog = false;
    };
    $scope.openDialog = function () {
        if (typeof $params.id === 'undefined') {
            $scope.dialog = true;
        }
    };
    $scope.open = function (id) {
        admin.toCampuses(id);
    };
    $scope.createInsti = function () {
        httpFacade.createInsti($.param($scope.insti)).then(function (res) {
            log(res.data);
        });
    };
}]);
