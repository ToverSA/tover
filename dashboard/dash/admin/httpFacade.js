/*global app*/
/*global log*/
app.service('httpFacade', ['$rootScope', '$http', function ($rootScope, $http) {
    'use strict';
    var self = this,
        baseUrl = '_php/v1',
        getUrl = '_php/v1/get.php',
        postUrl = '_php/v1/post.php';
    self.getCampuses = function () {
        return $http.get(getUrl + '/admin/campuses');
    };
    self.addCampus = function (param) {
        return $http.post(postUrl + '/admin/campuses', param);
    };
    self.isAuth = function () {
        $rootScope.$broadcast('NO_AUTH');
    };
    self.auth = function (param) {
        $http.post(postUrl + '/admin/auth', param).then(function (res) {
            $rootScope.$broadcast('AUTH', res.data);
        });
    };
}]);
