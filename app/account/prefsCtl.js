/*global app*/
/*global log*/
/*global $*/
app.controller('prefsCtl', ['$scope', '$http', '$location', '$routeParams', 'AppStore', function ($scope, $http, $location, $routeParams, AppStore) {
    'use strict';
    log('prefs');
    $scope.toCons = function () {
        $location.url('/account?rel=console');
    };
}]);