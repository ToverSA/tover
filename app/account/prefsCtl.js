/*global app*/
/*global log*/
/*global $*/
app.controller('prefsCtl', ['$scope', '$location', 'httpFacade', 'AppStore', function ($scope, $location, httpFacade, AppStore) {
    'use strict';
    function init() {
        httpFacade.getCredits().then(function (res) {
            log(res.data);
        });
        $scope.current = {};
        $scope.data = {};
        $scope.credits = 0;
        $scope.current.name = AppStore.getUserName();
        $scope.data.name = AppStore.getUserName();
        $scope.current.number = AppStore.getUserNumber();
        $scope.data.number = AppStore.getUserNumber();
        $scope.current.w = AppStore.getWhatsapp();
        if ($scope.current.w === '1') {
            $scope.data.w = true;
        } else {
            $scope.data.w = false;
        }
        $scope.current.email = AppStore.getUserEmail();
        $scope.dataChanged = false;
    }
    $scope.toCons = function () {
        $location.url('/account?rel=console');
    };
    init();
    $scope.edit = function (i) {
        $scope.editing = i;
    };
    $scope.close = function () {
        $scope.editing = 0;
        if ($scope.data.w === true) {
            if ($scope.current.w === '0') {
                $scope.dataChanged = true;
                $scope.current.w = '1';
            }
        } else {
            if ($scope.current.w === '1') {
                $scope.dataChanged = true;
                $scope.current.w = '0';
            }
        }
        if ($scope.current.name !== $scope.data.name) {
            $scope.dataChanged = true;
            $scope.current.name = $scope.data.name;
        } else if ($scope.current.number !== $scope.data.number) {
            $scope.dataChanged = true;
            $scope.current.number = $scope.data.number;
        }
    };
    $scope.save = function () {
        httpFacade.putAccount($.param($scope.data)).then(function (res) {
            if (res.data === '1') {
                AppStore.setUserName($scope.current.name);
                AppStore.setUserNumber($scope.current.number);
                AppStore.setWhatsapp($scope.current.w);
                init();
            }
        });
    };
    $scope.del = function (pwd) {
        if (typeof pwd !== 'undefined' && pwd.length > 3) {
            $scope.editing = 0;
            $scope.$emit('START_LOADING');
            httpFacade.deleteAccount($.param({password: pwd})).then(function (res) {
                AppStore.clearAll();
                $location.url('home');
                $scope.$emit('STOP_LOADING');
            }, function (err) {
                $scope.$emit('STOP_LOADING');
                $scope.$emit('ERROR', {code: err.status, desc: err.data});
            });
        }
    };
}]);