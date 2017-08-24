/*global app*/
/*global log*/
app.controller('consoleCtl', ['$scope', '$location', 'AppStore', 'mService', 'httpFacade', function ($scope, $location, AppStore, mService, httpFacade) {
    'use strict';
    $scope.accState = 2;
    $scope.$on('NOTIFY', function (evt, n) {
        $scope.notify = n;
    });
    mService.init(1);
    //[x]NOTE message notification should show on user icon even whilst browsing home
    $scope.createAd = function () {
        $location.url('/ads/create');
    };
    $scope.openAd = function (id) {
        $location.url('/ads/' + id);
    };
    $scope.toInbox = function () { $location.url('/messenger'); };
    httpFacade.getAccountAds().then(function (res) {
        $scope.ads = res.data;
    });
    httpFacade.getAccount().then(function (res) {
        AppStore.setCampus(res.data.campus.id, res.data.campus.name);
        AppStore.setUserId(res.data.id);
        AppStore.setUserName(res.data.name);
        AppStore.setUserEmail(res.data.email);
        AppStore.setUserNumber(res.data.number);
        AppStore.setWhatsapp(res.data.whatsapp);
        $scope.name = res.data.name;
    }, function (err) {
        if (err.status === 403) {
            AppStore.clearAll();
            $location.url('/home');
        }
    });
    $scope.$on('NEW_MESSAGE', function () {});
}]);
