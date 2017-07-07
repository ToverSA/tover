/*global app*/
/*global log*/
/*global sessionStorage*/
/*global $*/
app.controller('messengerCtl', ['$scope', '$routeParams', '$location', '$http', '$timeout', 'AppStore', 'mService', function ($scope, $routeParams, $location, $http, $timeout, AppStore, mService) {
    'use strict';
    $scope.msg = {};
    $scope.param = {};
    $scope.to = {};
    $scope.inbox = {};
    $scope.thread = [];
    $scope.body = '';
    function scrollMsgs() {
        $timeout(function () {
            var x, y, z;
            x = $('#msgs').height();
            y = $('#msg').height();
            z = y - x;
            if (z > 0) {
                $('#msgs').scrollTop(z);
            }
        }, 10);
    }
    $scope.$on('THREAD', function (evt, ar) {
        $scope.inbox.forEach(function (x) {
            if (x.id === ar[0] && x.tid === ar[1]) {
                $scope.to.name = x.name;
                $scope.to.ad = $routeParams.id;
                $scope.thread = x.thread;
                x.seen = true;
                mService.setOpened(x.tid);
                scrollMsgs();
            }
        });
    });
    $scope.$on('INBOX', function () {
        $scope.inbox = mService.getInbox();
        if (typeof $routeParams.tid !== 'undefined') {
            $scope.inbox.forEach(function (x) {
                if (x.id === Number.parseInt($routeParams.id) && x.tid === Number.parseInt($routeParams.tid)) {
                    mService.requestThread(x.tid);
                }
            });
        } else {
            $scope.inbox.forEach(function (x) {
                if (x.id === Number.parseInt($routeParams.id)) {
                    $scope.open(x.id, x.tid);
                }
            });
        }
    });
    $scope.delThread = function () {};
    $scope.viewAd = function () {
        $location.url('/ads/' + $scope.to.ad);
    };
    $scope.open = function (x, y) {
        var q = $location.search();
        q.id = x;
        if (typeof y !== 'undefined') {
            q.tid = y;
        }
        $location.search(q);
    };
    $scope.send = function () {
        if (typeof $routeParams.id !== 'undefined' && $scope.body.length > 0) {
            mService.send($routeParams.id, $scope.body, $routeParams.tid);
        }
        $scope.body = '';
    };
    if (AppStore.isToken()) {
        mService.init();
        if (typeof $routeParams.id === 'undefined') {
            $scope.list = 0;
        } else if (typeof $routeParams.tid === 'undefined') {
            $scope.list = 1;
        } else {
            $scope.list = 2;
        }
    }
}]);