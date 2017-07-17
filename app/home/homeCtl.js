/*global app*/
/*global log*/
/*global $*/
app.controller('homeCtl', ['$scope', 'httpFacade', '$location', 'AppStore', function ($scope, httpFacade, $location, AppStore) {
    'use strict';
    var p = 2, total;
    function init() {
        httpFacade.getPromoAds($.param({cid: AppStore.getCampusId()})).then(function (res) {
            $scope.promo = res.data;
        });
        httpFacade.getAds($.param({cid: AppStore.getCampusId()})).then(function (res) {
            $scope.ads = res.data;
        }, function (err) {
            //TODO handle error for get ads here
        });
        httpFacade.getAdsCount($.param({cid: AppStore.getCampusId()})).then(function (res) {
            total = Number.parseInt(res.data);
            $scope.total = total;
        });
    }
    $scope.promo = [];
    $scope.loadMore = function () {
        httpFacade.getAds($.param({cid: AppStore.getCampusId(), page: p})).then(function (res) {
            res.data.forEach(function (x) {
                $scope.ads.push(x);
            });
            p += 1;
        }, function (err) {
            //TODO handle error for get ads here
        });
    };
    $scope.campus = AppStore.getCampusName();
    $scope.viewAd = function (i) {
        $location.url('/ads/' + i);
    };
    init();
}]);