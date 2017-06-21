/*global app*/
app.controller('consoleCtl', ['$scope', '$http', 'AppStore', function ($scope, $http, AppStore) {
    'use strict';
    function loadAds() {
        $http.get('api.php/v1/account/ads', {
            headers: {'token': AppStore.getToken()}
        }).then(function (res) {
            $scope.ads = res.data;
        }, function (err) {
            //TODO if getting ads renders an error
        });
    }
    function getUser() {
        $http.get('api.php/v1/account', {
            headers: {'token': AppStore.getToken()}
        }).then(function (res) {
            AppStore.setCampus(res.data.campus.id, res.data.campus.name);
            AppStore.setUserId(res.data.id);
            AppStore.setUserName(res.data.name);
            AppStore.setUserEmail(res.data.email);
            AppStore.setUserNumber(res.data.number);
//            loadAccount();
        }, function (err) {
            //TODO handle account errors
        });
    }
}]);