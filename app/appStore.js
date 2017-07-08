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
        searchSettings = 'U0VBUkNIU0VUVElOR1M',
        msgStore = 'SU5CT1g',
        wStore = 'V0hBVFNBUFA',
        token = 'VE9LRU4';
    function enc(str) {
        return CryptoJS.AES.encrypt(str, 'akomo');
    }
    function dec(str) {
        if (str === null) {
            return null;
        }
        var bytes = CryptoJS.AES.decrypt(str, 'akomo');
        return bytes.toString(CryptoJS.enc.Utf8);
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
    self.getInbox = function () {
        var x = localStorage.getItem(msgStore);
        if (x === null) {
            return {};
        }
        return JSON.parse(dec(x));
    };
    self.setInbox = function (obj) {
        localStorage.setItem(msgStore, enc(JSON.stringify(obj)));
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
    self.setSearchPrefs = function (obj) {
        localStorage.setItem(searchSettings, enc(JSON.stringify(obj)));
    };
    self.getSearchPrefs = function () {
        var x = localStorage.getItem(searchSettings);
        if (x === null) {
            return false;
        }
        return JSON.parse(dec(x));
    };
    self.setWhatsapp = function (w) {
        localStorage.setItem(wStore, w);
    };
    self.getWhatsapp = function () {
        return localStorage.getItem(wStore);
    };
    self.clearAll = function () {
        localStorage.removeItem(token);
        localStorage.removeItem(userId);
        localStorage.removeItem(userName);
        localStorage.removeItem(userEmail);
        localStorage.removeItem(userNumber);
    };
}]);