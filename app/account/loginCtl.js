/*global app*/
/*global log*/
/*global $*/
app.controller('loginCtl', ['$scope', '$location', '$http', 'AppStore', function ($scope, $location, $http, AppStore) {
    'use strict';
    function auth(e, p) {
        $scope.$emit('START_LOADING');
        var data = {email: e.toLowerCase(), password: p};
        $http.post('api.php/v1/users/auth', $.param(data)).then(function (res) {
            $scope.$emit('STOP_LOADING');
            AppStore.setUserId(res.data.id);
            AppStore.setToken(res.data.token);
            $location.url('/account');
        }, function (err) {
            $scope.$emit('STOP_LOADING');
            if (err.status === 401) {
                $location.url('/account?rel=verify&email=' + e + '&from=login');
            } else {
                $scope.$emit('ERROR', {code: err.status, desc: err.data});
            }
        });
    }
    $scope.test = function () {
        log('test');
    };
    $scope.logIn = function (authData) {
        if (typeof authData === 'undefined') {
            $scope.err = true;
            $scope.errMsg = 'Email and password empty!';
        } else if (typeof authData.email === 'undefined') {
            $scope.err = true;
            $scope.errMsg = 'Email field is empty!';
        } else if (typeof authData.password === 'undefined') {
            $scope.err = true;
            $scope.errMsg = 'Password field is empty!';
        } else {
            $scope.err = false;
            auth(authData.email, authData.password);
        }
    };
}]);
