/*global app*/
/*global log*/
/*global $*/
/*global FileReader*/
app.controller('adsCreateCtl', ['$scope', '$location', 'httpFacade', 'AppStore', function ($scope, $location, httpFacade, AppStore) {
    'use strict';
    //NOTE create controller
    //TODO stop allowing empty fields to go unchecked please
    $scope.cat = false;
    $scope.display = '- Choose category - ';
    $scope.cats = [
        {id: 1, name: "Books & Study Material"},
        {id: 2, name: "Electronics & Gadgets"},
        {id: 3, name: "Phones & Laptops"},
        {id: 4, name: "Services & Other"}
    ];
    $scope.dummy = [1, 2, 3, 4, 5];
    $scope.images = [];
    $scope.ad = {
        price: 0,
        images: []
    };
    var reader = new FileReader();
    reader.onload = function () {
        $scope.images.push(reader.result);
        $scope.dummy.splice(-1);
        $scope.$apply();
    };
    $scope.error = {};
    $scope.closeErrDialog = function () {
        $scope.error.showing = false;
    };
    $scope.clear = function (i) {
        if ($scope.images.length !== 6) {
            $scope.dummy.push($scope.dummy.length + 1);
        }
        $scope.images.splice(i, 1);
    };
    $scope.cancelAd = function () {
        $location.url('/account');
    };
    $scope.show = function () {
        $scope.cat = true;
    };
    $scope.sel = function (i) {
        $scope.ad.category = $scope.cats[i].id;
        $scope.display = $scope.cats[i].name;
        $scope.cat = false;
    };
    $scope.back = function () {
        $scope.aPage -= 1;
        if ($scope.aPage === 2) {
            $scope.dummy.splice(-1);
        }
    };
    $scope.step = function () {
        if ($scope.aPage === 1) {
            if (typeof $scope.ad.title === 'undefined') {
                $scope.error.showing = true;
                $scope.error.description = 'Title should not be empty';
            } else if (typeof $scope.ad.category === 'undefined') {
                $scope.error.showing = true;
                $scope.error.description = 'Category not chosen';
            } else {
                $scope.aPage += 1;
            }
        } else if ($scope.aPage === 2) {
            $scope.aPage += 1;
            $scope.dummy.push($scope.dummy.length + 1);
        } else if ($scope.aPage === 3) {
            $scope.ad.userId = AppStore.getUserId();
            $scope.ad.images = [];
            $scope.images.forEach(function (x) {
                $scope.ad.images.push(x.substring(x.indexOf(',') + 1));
            });
            $scope.loading = true;
            httpFacade.postAd($.param($scope.ad)).then(function (res) {
                $scope.loading = false;
                $location.url('/account');
            }, function (err) {
                //TODO handle advert error
            });
        }
    };
    $scope.fileNameChanged = function (files) {
        reader.readAsDataURL(files[0]);
    };
}]);
