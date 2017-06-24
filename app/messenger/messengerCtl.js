/*global app*/
/*global log*/
app.controller('messengerCtl', ['$scope', '$routeParams', '$location', '$http', 'AppStore', function ($scope, $routeParams, $location, $http, AppStore) {
    'use strict';
    $scope.inbox = {};
    $scope.msg = {};
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
    $scope.delThread = function () {
//        delete $scope.thread;
    };
    $scope.viewAd = function () {
        $location.url('/ads/' + $scope.msg.ad_id);
    };
    $scope.setEmail = function () {
        if (typeof $scope.msg.email !== 'undefined') {
            AppStore.setUserEmail($scope.msg.email);
            $scope.setup = true;
        }
        if (typeof $scope.msg.name !== 'undefined') {
            AppStore.setUserName($scope.msg.name);
        }
    };
    $scope.send = function () {
        if ($scope.body.length < 1) {
            return false;
        }
        var msg = {
            body: $scope.body,
            sent: true,
            status: 'sending',
            date: new Date().toLocaleString()
        };
        $scope.thread.push(msg);
        AppStore.setInbox($scope.inbox);
        send($scope.body);
        $scope.body = '';
    };
    if (AppStore.getInbox() !== null) {
        $scope.inbox = AppStore.getInbox();
    }
    if (typeof $routeParams.id !== 'undefined') {
        $scope.list = false;
        $scope.msg.ad_id = $routeParams.id;
        $scope.thread = $scope.inbox[$routeParams.id];
        if (typeof $scope.thread === 'undefined') {
            $scope.thread = [];
            $scope.inbox[$routeParams.id] = $scope.thread;
        }
    } else {
        $scope.list = true;
    }
    if (AppStore.isToken()) {
        $scope.setup = true;
    } else if (AppStore.getUserEmail() !== null) {
        $scope.msg.email = AppStore.getUserEmail();
        $scope.msg.name = AppStore.getUserName();
        $scope.setup = true;
    }
}]);