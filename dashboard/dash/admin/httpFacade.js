/*global app*/
/*global log*/
app.service('httpFacade', ['$http', function ($http) {
    'use strict';
    var self = this;
    self.createInsti = function (param) {
        return $http.post('_php/createInstitution.php', param);
    };
    self.isAuth = function () {
        return $http.get('_php/isAuth.php', {cache: true});
    };
}]);
