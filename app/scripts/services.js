/*global app*/
/*global log*/
/*global CryptoJS*/
app.service('AppStore', ['$cookies', function ($cookies) {
    'use strict';
    var self = this,
        campusName = 'Q0FNUFVTTkFNRQ',
        campusId = 'Q0FNUFVTSUQ',
        userId = 'VVNFUklE',
        userName = 'VVNFUk5BTUU',
        userEmail = 'VVNFUkVNQUlM',
        userNumber = 'VVNFUk5VTUJFUg',
        token = 'VE9LRU4';
    //TODO CryptoJS bug
    function enc(str) {
        return str;
//        return CryptoJS.AES.encrypt(str, 'akomo');
    }
    function dec(str) {
        return str;
//        return CryptoJS.AES.decrypt(str, 'akomo');
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
        /* Returns access token */
        return dec($cookies.get(token));
    };
    self.getUserName = function () {
        return dec($cookies.get(userName));
    };
    self.getUserEmail = function () {
        return dec($cookies.get(userEmail));
    };
    self.getUserNumber = function () {
        return dec($cookies.get(userNumber));
    };
    self.setUserName = function (name) {
        $cookies.put(userName, enc(name));
    };
    self.setUserNumber = function (number) {
        $cookies.put(userNumber, enc(number));
    };
    self.setUserEmail = function (email) {
        $cookies.put(userEmail, enc(email));
    };
    self.setUserId = function (id) {
        $cookies.put(userId, id);
    };
    self.getUserId = function () {
        return $cookies.get(userId);
    };
    self.getCampusName = function () {
        return dec($cookies.get(campusName));
    };
    self.setCampus = function (id, name) {
        $cookies.put(campusId, id);
        $cookies.put(campusName, enc(name));
    };
    self.clearAll = function () {
        $cookies.remove(token);
        $cookies.remove(userId);
        $cookies.remove(userName);
        $cookies.remove(userEmail);
        $cookies.remove(userNumber);
    };
}]);
