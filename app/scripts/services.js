/*global app*/
/*global log*/
/*global CryptoJS*/
app.service('AppStore', ['$cookies', function ($cookies) {
    'use strict';
    var self = this,
        campusName = 'Q0FNUFVTTkFNRQ',
        campusId = 'Q0FNUFVTSUQ',
        token = 'VE9LRU4';
    function enc(str) {
        return CryptoJS.AES.encrypt(str, 'akomo');
    }
    function dec(str) {
        return CryptoJS.AES.decrypt(str, 'akomo');
    }
    self.isToken = function () {
        if (typeof $cookies.get(token) === 'undefined') {
            return false;
        } else {
            return true;
        }
    };
    self.isNew = function () {
        if (typeof $cookies.get(campusId) === 'undefined') {
            return true;
        } else {
            return false;
        }
    };
    self.setToken = function (t) {
        $cookies.put(token, enc(t));
    };
    self.getToken = function () {
        return dec($cookies.get(token));
    };
    self.setCampus = function (id, name) {
        $cookies.put(campusId, id);
        $cookies.put(campusName, enc(name));
    };
}]);
