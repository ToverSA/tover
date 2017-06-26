/*global app*/
/*global log*/
app.service('httpFacade', ['$http', 'AppStore', function ($http, AppStore) {
    'use strict';
    var self = this,
        baseUrl = 'api.php/v1';
    self.getAds = function () {};
    self.getMessages = function (param) {
        return $http.get(baseUrl + '/messages?' + param);
    };
//    self.postMessage = function () {};
    self.postMessage = function (param) {
        return $http.post(baseUrl + '/messages', param, { headers: {'token': AppStore.getToken()}});
    };
}]);