/*global app*/
/*global CryptoJS*/
app.service('AppStore', ['$cookies', function ($cookies) {
    'use strict';
    var self = this,
        campusName = 'Q0FNUFVTTkFNRQ',
        campusId = 'Q0FNUFVTSUQ';
    function enc(str) {
        return CryptoJS.AES.encrypt(str, 'akomo');
    }
    function dec(str) {
        return CryptoJS.AES.decrypt(str, 'akomo');
    }
    self.isNew = function () {
        if (typeof $cookies.get(campusId) === 'undefined') {
            return true;
        } else {
            return false;
        }
    };
    self.setCampus = function (id, name) {
        $cookies.put(campusId, id);
        $cookies.put(campusName, enc(name));
    };
}]);
