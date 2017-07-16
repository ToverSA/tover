/*global app*/
/*global log*/
/*global $*/
app.controller('adsCtl', ['$scope', '$location', '$routeParams', 'httpFacade', 'AppStore', function ($scope, $location, $routeParams, httpFacade, AppStore) {
    'use strict';
    //NOTE ads controller
    var src;
    function del(id) {
        httpFacade.deleteAd($.param({id: id})).then(function (res) {
            $location.url('/account');
        });
    }
    function init() {
        if (typeof $routeParams.id !== 'undefined') {
            httpFacade.getAds($.param({id: $routeParams.id})).then(function (res) {
                $scope.ad = res.data;
                src = new Array($scope.ad.src_id.length);
                $scope.ad.src_id.forEach(function (x) {
                    src[$scope.ad.src_id.indexOf(x)] = x;
                });
                $scope.cover = $scope.ad.src_id.splice(0, 1);
                $scope.dummy = new Array(5 - $scope.ad.src_id.length);
                //$scope.dummy
                var i = 0;
                for (i = 0; i < $scope.dummy.length; i += 1) {
                    $scope.dummy[i] = i;
                }
                if (AppStore.isToken()) {
                    $scope.state = 1;
                    $scope.email = AppStore.getUserEmail();
                    if (AppStore.getUserId() - $scope.ad.uid === 0) {
                        $scope.state = 2;
                    }
                }
            }, function (err) {
                //TODO handle geting ads error
            });
        }
    }
    $scope.isGuest = true;
    $scope.sendMessage = function () {
        if (AppStore.isToken()) {
            $location.url('/messenger?id=' + $scope.ad.id);
        } else {
            $location.url('/account?redirect=' + $location.url());
        }
    };
    $scope.userClicked = function () {
        $location.url('/search?u=' + $scope.ad.uid
                      + '&name=' + $scope.ad.name);
    };
    $scope.reportAd = function (id) {
        //TODO implement dialog for this
    };
    $scope.inView = {
        id: 0,
        next: true,
        prev: true
    };
    $scope.view = function (id) {
        $scope.inView.id = id;
        if (src.indexOf(id) === 0) {
            $scope.inView.prev = false;
        } else {
            $scope.inView.prev = true;
        }
        if (src.indexOf(id) === src.length - 1) {
            $scope.inView.next = false;
        } else {
            $scope.inView.next = true;
        }
        $scope.isViewing = true;
    };
    $scope.next = function () {
        if ($scope.inView.next === true) {
            $scope.view(src[src.indexOf($scope.inView.id) + 1]);
        }
    };
    $scope.prev = function () {
        if ($scope.inView.prev === true) {
            $scope.view(src[src.indexOf($scope.inView.id) - 1]);
        }
    };
    $scope.del = function () {
        if ($scope.isDel === true) {
            del($scope.ad.id);
            $scope.isDel = false;
        } else {
            $scope.isDel = true;
        }
    };
    $scope.confPromo = function () {
        log($scope.one);
    };
    $scope.deal = 1;
    $scope.sel = function (i) {
        $scope.deal = i;
    };
    $scope.promote = function (v) {
        $scope.prom = v;
    };
    $scope.pState = 1;
    init();
}]);