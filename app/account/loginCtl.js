/*global app*/
/*global log*/
/*global $*/
app.controller('loginCtl', ['$scope', '$location', '$http', 'AppStore', function ($scope, $location, $http, AppStore) {
    'use strict';
    function auth(e, p) {
        var data = {email: e.toLowerCase(), password: p};
        $http.post('api.php/v1/users/auth', $.param(data)).then(function (res) {
            AppStore.setToken(res.data.token);
            AppStore.setUserId(res.data.id);
            if (typeof $location.search().redirect !== 'undefined') {
                $location.url($location.search().redirect);
            } else {
                $location.url('/account?rel=console');
            }
        }, function (err) {
            //TODO handle auth errors
        });
    }
    $scope.authData = {};
    $scope.logIn = function () {
        if (typeof $scope.authData.email === 'undefined') {
            $scope.err = true;
            $scope.errMsg = 'Email field is empty!';
        } else if (typeof $scope.authData.password === 'undefined') {
            $scope.err = true;
            $scope.errMsg = 'Password field is empty!';
        } else {
            $scope.err = false;
            auth($scope.authData.email, $scope.authData.password);
        }
    };
}]);