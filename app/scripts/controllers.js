/*global app*/
/*global log*/
app.controller('accountCtl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    'use strict';
    var self = this;
    self.LOADING = 0;
    self.LOGIN = 1;
    self.REGISTER = 2;
    self.RECOVERY = 3;
    self.MAIN = 4;
    // Pages under main
    self.CONSOLE = 5;

    function init() {
        $http.get('/api/access.json').then(function (res) {
            if (res.data.access === true) {
                $scope.accountState = self.MAIN;
            } else {
                $scope.accountState = self.LOGIN;
            }
        }, function (err) {});
    }
    $scope.toRecovery = function () { $scope.accountState = self.RECOVERY; };
    $scope.toRegister = function () { $scope.accountState = self.REGISTER; };
    $scope.toLogin = function () { $scope.accountState = self.LOGIN; };
    $scope.logIn = function () {
        $scope.accountState = self.MAIN;
    };
    $scope.createAd = function () {
        $location.url('/ads/create');
    };
    $scope.createNew = function () {
        $scope.accountState = self.MAIN;
    };
    init();
}]);
app.controller('homeCtl', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    function init() {
        $http.get('/api/ads.json').then(function (res) {
        }, function (err) {
            log(err);
        });
    }
    init();
}]);
app.controller('adsCreateCtl', ['$scope', '$location', function ($scope, $location) {
    'use strict';
    $scope.cancelAd = function () {
        $location.url('/');
    };
    $scope.back = function () {
        $scope.aPage -= 1;
    };
    $scope.step = function () {
        if ($scope.aPage === 1) {
            $scope.aPage += 1;
        } else if ($scope.aPage === 2) {
            $scope.aPage += 1;
        } else if ($scope.aPage === 3) {
            $location.url('/account');
        }
    };
}]);
