/*global app*/
/*global log*/
app.controller('consoleCtl', ['$scope', '$http', '$location', 'AppStore', 'mService', function ($scope, $http, $location, AppStore, mService) {
    'use strict';
    $scope.$on('NOTIFY', function (evt, n) {
        log('notify');
        $scope.notify = n;
    });
    mService.init(1);
    $scope.logout = function () {
        AppStore.clearAll();
        $location.url('/home');
    };
    $scope.createAd = function () {
        $location.url('/ads/create');
    };
    $scope.openAd = function (id) {
        $location.url('/ads/' + id);
    };
    $scope.toInbox = function () { $location.url('/messenger'); };
    $http.get('api.php/v1/account/ads', {
        headers: {'token': AppStore.getToken()}
    }).then(function (res) {
        $scope.ads = res.data;
    }, function (err) {
        //TODO if getting ads renders an error
    });
    $http.get('api.php/v1/account', {
        headers: {'token': AppStore.getToken()}
    }).then(function (res) {
        AppStore.setCampus(res.data.campus.id, res.data.campus.name);
        AppStore.setUserId(res.data.id);
        AppStore.setUserName(res.data.name);
        AppStore.setUserEmail(res.data.email);
        AppStore.setUserNumber(res.data.number);
        AppStore.setWhatsapp(res.data.whatsapp);
        $scope.name = res.data.name;
    }, function (err) {
        //TODO handle account errors
    });
    $scope.$on('NEW_MESSAGE', function () {});
}]);