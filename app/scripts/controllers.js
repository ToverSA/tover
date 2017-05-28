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
    $scope.logIn = function () {};
    init();
}]);
