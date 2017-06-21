/*global app*/
app.controller('landingCtl', ['$scope', '$http', 'AppStore', '$location', function ($scope, $http, AppStore, $location) {
    'use strict';
    //NOTE landing controller
    var insties = [];
    $http.get('api.php/v1/campuses', {cache: true}).then(function (res) {
        insties = res.data;
        var i = 0;
        $scope.list = [];
        insties.forEach(function (x) {
            $scope.list.push(x);
        });
    }, function (err) {
        //TODO error requesting campuses
    });
    $scope.state = 0;
    $scope.browse = function (i) {
        if ($scope.state === 0) {
            $scope.iName = insties[i].name;
            $scope.list = [];
            insties[i].campuses.forEach(function (x) {
                $scope.list.push(x);
            });
            $scope.state = 1;
        } else {
            AppStore.setCampus($scope.list[i].id, $scope.list[i].name);
            $location.url('/home');
        }
    };
    $scope.change = function () {
        $scope.state = 0;
        $scope.list = [];
        insties.forEach(function (x) {
            $scope.list.push(x);
        });
    };
    $scope.getStarted = function () {
        if (AppStore.isNew()) {
            $scope.dialog = true;
        } else {
            $location.url('/home');
        }
    };
}]);