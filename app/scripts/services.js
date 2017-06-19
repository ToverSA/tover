/*global app*/
/*global log*/
/*global CryptoJS*/
/*global localStorage*/
app.service('AppStore', [function () {
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
        if (localStorage.getItem(token) === null) {
            return false;
        } else {
            return true;
        }
    };
    self.isNew = function () {
        if (localStorage.getItem(campusId) === null) {
            return true;
        } else {
            return false;
        }
    };
    self.setToken = function (t) {
        localStorage.setItem(token, enc(t));
    };
    self.getToken = function () {
        /* Returns access token */
        return dec(localStorage.getItem(token));
    };
    self.getUserName = function () {
        return dec(localStorage.getItem(userName));
    };
    self.getUserEmail = function () {
        return dec(localStorage.getItem(userEmail));
    };
    self.getUserNumber = function () {
        return dec(localStorage.getItem(userNumber));
    };
    self.setUserName = function (name) {
        localStorage.setItem(userName, enc(name));
    };
    self.setUserNumber = function (number) {
        localStorage.setItem(userNumber, enc(number));
    };
    self.setUserEmail = function (email) {
        localStorage.setItem(userEmail, enc(email));
    };
    self.setUserId = function (id) {
        localStorage.setItem(userId, id);
    };
    self.getUserId = function () {
        return localStorage.getItem(userId);
    };
    self.getCampusName = function () {
        return dec(localStorage.getItem(campusName));
    };
    self.getCampusId = function () {
        return localStorage.getItem(campusId);
    };
    self.setCampus = function (id, name) {
        localStorage.setItem(campusId, id);
        localStorage.setItem(campusName, enc(name));
    };
    self.clearAll = function () {
        localStorage.removeItem(token);
        localStorage.removeItem(userId);
        localStorage.removeItem(userName);
        localStorage.removeItem(userEmail);
        localStorage.removeItem(userNumber);
    };
}]);
