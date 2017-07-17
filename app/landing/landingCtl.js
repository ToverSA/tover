/*global app*/
app.controller('landingCtl', ['$scope', 'httpFacade', 'AppStore', '$location', function ($scope, httpFacade, AppStore, $location) {
    'use strict';
    //NOTE landing controller
    var insties = [];
    httpFacade.getCampuses().then(function (res) {
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
            httpFacade.visit('cid=' + $scope.list[i].id);
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
            httpFacade.visit('cid=' + AppStore.getCampusId());
            $location.url('/home');
        }
    };
}]);