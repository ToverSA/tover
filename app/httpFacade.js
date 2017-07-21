/*global app*/
/*global log*/
app.service('httpFacade', ['$http', 'AppStore', function ($http, AppStore) {
    'use strict';
    var self = this,
        baseUrl = 'api.php/v1';
    self.getAdsCount = function (param) {
        return $http.get(baseUrl + '/ads/count?' + param);
    };
    self.getAccountAds = function (param) {
        return $http.get('api.php/v1/account/ads', { headers: {'token': AppStore.getToken()}});
    };
    self.getAds = function (param, c) {
        if (typeof c === 'undefined') {
            c = false;
        }
        return $http.get(baseUrl + '/ads?' + param, {cache: c});
    };
    self.getPromoAds = function (param) {
        return $http.get(baseUrl + '/ads/promotions?' + param);
    };
    self.getCredits = function () {
        return $http.get(baseUrl + '/credits', { headers: {'token': AppStore.getToken()}});
    };
    self.getUsers = function (param) {
        return $http.get(baseUrl + '/users?' + param, {cache: true});
    };
    self.getAccount = function () {
        return $http.get('api.php/v1/account', { headers: {'token': AppStore.getToken()}});
    };
    self.getMessages = function (param) {
        if (typeof param === 'undefined') {
            return $http.get(baseUrl + '/messages', {headers: {'token': AppStore.getToken()}});
        } else {
            return $http.get(baseUrl + '/messages?' + param, {headers: {'token': AppStore.getToken()}});
        }
    };
    self.getCampuses = function () {
        return $http.get('api.php/v1/campuses', {cache: true});
    };
    self.postCredits = function (param) {
        return $http.post(baseUrl + '/credits', param, { headers: {'token': AppStore.getToken()}});
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
    self.promote = function (param) {
        return $http.put(baseUrl + '/ads/promotions', param, { headers: {'token': AppStore.getToken()}});
    };
    self.visit = function (param) {
        return $http.post(baseUrl + '/visitors', param);
    };
    self.purchase = function (param) {
        var form = document.createElement('form'),
            id = document.createElement('input'),
            deal = document.createElement('input');
        form.method = 'post';
        form.action = baseUrl + '/account/confirm';
        id.type = 'hidden';
        id.name = 'id';
        id.value = AppStore.getUserId();
        deal.type = 'hidden';
        deal.name = 'deal';
        deal.value = param;
        form.appendChild(id);
        form.appendChild(deal);
        document.body.appendChild(form);
        form.submit();
    };
    self.deleteAccount = function (param) {
        return $http({
            method: 'DELETE',
            url: baseUrl + '/account?' + param,
            headers: {'token': AppStore.getToken()}
        });
    };
    self.deleteAd = function (param) {
        return $http({
            method: 'DELETE',
            url: baseUrl + '/ads?' + param,
            headers: {'token': AppStore.getToken()}
        });
    };
}]);