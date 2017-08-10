/*global app*/
/*global log*/
/*global $*/
app.controller('campusesCtl', ['$scope', '$routeParams', 'httpFacade', function ($scope, $params, httpFacade) {
    'use strict';
    var choice = '';
    $scope.suggest = false;
//    $scope.insties = [
//        {
//            id: 1,
//            name: 'University of Zululand',
//            campuses: [
//                {
//                    name: 'KwaDlwangezwa Campus',
//                    users: 4,
//                    adverts: 109
//                }
//            ]
//        },
//        {name: 'University of KwaZulu Natal'}
//    ];
    function init() {
        httpFacade.getCampuses().then(function (res) {
            $scope.insties = res.data;
        }, function (err) {
            if (err.status === 404) {
                httpFacade.isAuth();
            }
        });
    }
    $scope.cancelC = function () {
        $scope.insti = '';
        $scope.campus = '';
        $scope.closed = false;
    };
    $scope.addC = function () {
        $scope.closed = true;
    };
    $scope.fillS = function (x) {
        $scope.suggest = false;
        $scope.insti = x;
        choice = x;
    };
    $scope.createC = function () {
        if (typeof $scope.insti !== 'undefined' && $scope.insti.length > 0) {
            httpFacade.addCampus($.param({institution: $scope.insti, campus: $scope.campus})).then(function (res) {
                init();
            });
            $scope.cancelC();
        }
    };
    $scope.$watch('insti', function (newVal, oldVal) {
        if (typeof newVal !== 'undefined' && newVal.length > 0 && choice !== newVal) {
            $scope.suggest = true;
        }
    });
    init();
}]);
