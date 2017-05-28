/*global app*/
app.controller('accountCtl', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    var self = this;
    self.LOADING = 0;
    self.LOGIN = 1;
    self.REGISTER = 2;
    self.RECOVERY = 3;
    self.MAIN = 4;
    function init() {
        $http.get('/api/access.json').then(function (res) {
            if (res.data.access === true) {
                window.console.log("state change to main:" + self.MAIN);
                $scope.accountState = self.MAIN;
            } else {
                window.console.log("state change to login:" + self.LOGIN);
                $scope.accountState = self.REGISTER;
            }
        }, function (err) {});
    }
    $scope.toRecovery = function () { $scope.accountState = self.RECOVERY; };
    $scope.toRegister = function () { $scope.accountState = self.REGISTER; };
    $scope.toLogin = function () { $scope.accountState = self.LOGIN; };
    $scope.logIn = function () {
        $scope.accountState = self.MAIN;
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
            window.console.log(res.data);
        }, function (err) {
            window.console.log(err);
        });
    }
    init();
}]);
