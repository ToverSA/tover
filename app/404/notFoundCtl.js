/*global app*/
/*global log*/
app.controller('notFoundCtl', ['$scope', '$location', 'AppStore', function ($scope, $loaction, AppStore) {
    'use strict';
    log($loaction.url());
    $scope.path = $loaction.url();
    $scope.link = '/home';
    if (AppStore.isNew()) { $scope.link = '/'; }
}]);