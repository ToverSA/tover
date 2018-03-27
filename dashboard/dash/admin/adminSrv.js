/*global app*/
app.service('adminSrv', ['$location', function ($location) {
    'use strict';
    var self = this;
    self.toAds = function () {
        $location.url('/adverts');
    };
    self.toUsers = function () {
        $location.url('/users');
    };
    self.toCampuses = function (id) {
        if (typeof id === 'undefined') {
            $location.url('/campuses');
        } else {
            $location.url('/campuses/' + id);
        }
    };
    self.toHome = function () {
        $location.url('/');
    };
    self.toLogin = function () {
        $location.url('/login');
    };
}]);
