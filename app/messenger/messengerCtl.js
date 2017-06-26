/*global app*/
/*global log*/
/*global sessionStorage*/
/*global $*/
app.controller('messengerCtl', ['$scope', '$routeParams', '$location', '$http', 'AppStore', 'mService', function ($scope, $routeParams, $location, $http, AppStore, mService) {
    'use strict';
    $scope.msg = {};
    $scope.param = {};
    $scope.to = {};
    $scope.inbox = {};
    $scope.thread = [];
    $scope.body = '';
    function send(body) {
        if (AppStore.isToken()) {
            $http.post('api.php/v1/messages').then(function (res) {
                log(res);
            });
        } else {
            $http.post('api.php/v1/messages').then(function (res) {
                log(res.data);
            });
        }
    }
    $scope.delThread = function () {};
    $scope.viewAd = function () {
        $location.url('/ads/' + $scope.to.ad);
    };
    $scope.setEmail = function () {
        if (typeof $scope.param.from !== 'undefined') {
            sessionStorage.setItem('param', $.param($scope.param));
            $location.url($location.url() + '&' + $.param($scope.param));
        }
    };
    $scope.open = function (x) {
        var q = $location.search();
        q.id = x;
        $location.search(q);
    };
    $scope.send = function () {
        if ($scope.body.length < 1) {
            return false;
        }
        var msg = {
            body: $scope.body,
            sent: true,
            status: 'sending'
        };
        $scope.thread.push(msg);
        mService.send($routeParams.id, $scope.body);
        $scope.body = '';
    };
    $scope.to.name = $routeParams.name;
    $scope.to.ad = $routeParams.id;
    $scope.$on('NEW_MESSAGE', function (evt) {
        $scope.inbox = mService.getInbox();
        $scope.thread = JSON.parse(JSON.stringify($scope.inbox[$routeParams.id].thread));
    });
    $scope.$on('MESSAGE_SENT', function (evt) {
        $scope.inbox = mService.getInbox();
        $scope.inbox[$routeParams.id].thread.forEach(function (x) {
            $scope.thread[$scope.inbox[$routeParams.id].thread.indexOf(x)] = x;
        });
    });
    if (AppStore.isToken()) {
        $scope.setup = true;
        if (typeof $routeParams.id !== 'undefined') {
            $scope.list = false;
        } else {
            $scope.list = true;
        }
    } else if (typeof $routeParams.from !== 'undefined') {
        mService.setup($routeParams.from, $routeParams.fname, $routeParams.id, $routeParams.name);
        $scope.setup = true;
        $scope.visitor = true;
    } else if (sessionStorage.length !== 0) {
        $location.url($location.url() + '&' + sessionStorage.getItem('param'));
    }
}]);