/*global app*/
/*global log*/
app.controller('adminCtl', ['$scope', 'adminSrv', 'httpFacade', function ($scope, admin, http) {
    'use strict';
    function init() {
        http.isAuth().then(function (res) {
            log(res.data);
        }, function (err) {
            if (err.status === '403') {
                admin.toLogin();
            }
        });
    }
    $scope.toAds = function () {
        admin.toAds();
    };
    $scope.toUsers = function () {
        admin.toUsers();
    };
    $scope.toCampuses = function () {
        admin.toCampuses();
    };
    $scope.toHome = function () {
        admin.toHome();
    };
    init();
}]);
