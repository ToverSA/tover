/*global app*/
app.controller('homeCtl', ['$scope', '$http', '$location', 'AppStore', function ($scope, $http, $location, AppStore) {
    'use strict';
    //NOTE home controller
    $scope.title = 'Some demo text and more testimonial bitch';
    function init() {
        $http.get('api.php/v1/ads?cid=' + AppStore.getCampusId()).then(function (res) {
            $scope.ads = res.data;
        }, function (err) {
            //TODO handle error for get ads here
        });
    }
    $scope.campus = AppStore.getCampusName();
    $scope.viewAd = function (i) {
        $location.url('/ads/' + i);
    };
    init();
}]);