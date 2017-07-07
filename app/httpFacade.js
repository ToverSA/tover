/*global app*/
/*global log*/
app.service('httpFacade', ['$http', 'AppStore', function ($http, AppStore) {
    'use strict';
    var self = this,
        baseUrl = 'api.php/v1';
    self.getAds = function () {};
    self.getMessages = function (param) {
        if (typeof param === 'undefined') {
            return $http.get(baseUrl + '/messages', {headers: {'token': AppStore.getToken()}});
        } else {
            return $http.get(baseUrl + '/messages?' + param, {headers: {'token': AppStore.getToken()}});
        }
    };
//    self.postMessage = function () {};
    self.postMessage = function (param) {
        return $http.post(baseUrl + '/messages', param, { headers: {'token': AppStore.getToken()}});
    };
}]);