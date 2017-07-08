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
    self.postMessage = function (param) {
        return $http.post(baseUrl + '/messages', param, { headers: {'token': AppStore.getToken()}});
    };
    self.putMessage = function (param) {
        return $http.put(baseUrl + '/messages', param, { headers: {'token': AppStore.getToken()}});
    };
    self.putAccount = function (param) {
        return $http.put(baseUrl + '/account', param, { headers: {'token': AppStore.getToken()}});
    };
    self.deleteAccount = function (param) {
        return $http({
            method: 'DELETE',
            url: baseUrl + '/account?' + param,
            headers: {'token': AppStore.getToken()}
        });
    };
}]);