/*global app*/
/*global log*/
/*global $*/
app.controller('actionCtl', ['$scope', '$http', '$location', '$routeParams', 'AppStore', function ($scope, $http, $location, $routeParams, AppStore) {
    'use strict';
    var type;
    function del(id) {
        $http.delete('api.php/v1/ads', {params: {id: id}, headers: {token: AppStore.getToken()}}).then(function (res) {
//            $location.url('account');
            log(res.data);
        });
    }
    if (typeof $routeParams.t !== 'undefined') {
        type = $routeParams.t;
        if (type === 'del') {
            if (typeof $routeParams.id !== 'undefined') {
                del($routeParams.id);
            }
        }
    } else {
        $location.url('/account');
    }
}]);
