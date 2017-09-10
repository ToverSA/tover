/*global angular*/
function log(str) {
    'use strict';
    window.console.log(str);
}
var app = angular.module('akomo', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
        .when('/',
            {
                templateUrl: 'app/landing/landing.html',
                controller: 'landingCtl'
            })
        .when('/home',
            {
                templateUrl: 'app/home/home.html',
                controller: 'homeCtl'
            })
        .when('/account',
            {
                templateUrl: 'app/account/account.html',
                controller: 'accountCtl'
            })
        .when('/account/:q',
            {
                templateUrl: 'app/account/account.html',
                controller: 'accountCtl'
            })
        .when('/account/delete',
            {
                templateUrl: 'app/account/delete.html'
            })
        .when('/ads/create',
            {
                templateUrl: 'app/ads/create.html',
                controller: 'adsCreateCtl'
            })
        .when('/search',
            {
                templateUrl: 'app/search/search.html',
                controller: 'adsSearchCtl'
            })
        .when('/search/:q',
            {
                templateUrl: 'app/search/search.html',
                controller: 'adsSearchCtl'
            })
        .when('/ads/:id',
            {
                templateUrl: 'app/ads/ads.html',
                controller: 'adsCtl'
            })
        .when('/faqs',
            {
                templateUrl: 'app/faqs/faqs.html',
                controller: 'faqsCtl'
            })
        .when('/faqs/:section',
            {
                templateUrl: 'app/partials/faqs.html',
                controller: 'faqsCtl'
            })
        .when('/messenger',
            {
                templateUrl: 'app/messenger/messenger.html',
                controller: 'messengerCtl'
            })
        .when('/messenger/:q',
            {
                templateUrl: 'app/messenger/messenger.html',
                controller: 'messengerCtl'
            })
        .otherwise({
            templateUrl: 'app/404/404.html',
            controller: 'notFoundCtl'
        });
}]);
app.config(["$httpProvider", function ($httpProvider) {
    'use strict';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}]);
app.config(['$locationProvider', function ($locationProvider) {
    'use strict';
    $locationProvider.html5Mode(true);
//Optional
}]);/*global app*/
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
}]);/*global app*/
/*global log*/
app.directive('enterKey', [function () {
    'use strict';
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.enterKey);
                });
                event.preventDefault();
            }
        });
    };
}]);
app.directive('anyKey', [function () {
    'use strict';
    return function (scope, element, attrs) {
        element.bind('keyup', function (event) {
            if ((event.which >= 65 && event.which <= 90) || event.which === 229 || event.which === 8) {
                scope.$apply(function () {
                    scope.$eval(attrs.anyKey);
                });
                event.preventDefault();
            }
        });
    };
}]);
app.directive('arrowKey', [function () {
    'use strict';
    return function (scope, element, attrs) {
        element.bind('keyup', function (event) {
            log(event);
            if ((event.which >= 65 && event.which <= 90) || event.which === 229 || event.which === 8) {
                scope.$apply(function () {
                    scope.$eval(attrs.anyKey);
                });
                event.preventDefault();
            }
        });
    };
}]);

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
}]);/*global angular*/
function log(str) {
    'use strict';
    window.console.log(str);
}
var app = angular.module('akomo', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
        .when('/',
            {
                templateUrl: 'app/landing/landing.html',
                controller: 'landingCtl'
            })
        .when('/home',
            {
                templateUrl: 'app/home/home.html',
                controller: 'homeCtl'
            })
        .when('/account',
            {
                templateUrl: 'app/account/account.html',
                controller: 'accountCtl'
            })
        .when('/account/:q',
            {
                templateUrl: 'app/account/account.html',
                controller: 'accountCtl'
            })
        .when('/account/delete',
            {
                templateUrl: 'app/account/delete.html'
            })
        .when('/ads/create',
            {
                templateUrl: 'app/ads/create.html',
                controller: 'adsCreateCtl'
            })
        .when('/search',
            {
                templateUrl: 'app/search/search.html',
                controller: 'adsSearchCtl'
            })
        .when('/search/:q',
            {
                templateUrl: 'app/search/search.html',
                controller: 'adsSearchCtl'
            })
        .when('/ads/:id',
            {
                templateUrl: 'app/ads/ads.html',
                controller: 'adsCtl'
            })
        .when('/faqs',
            {
                templateUrl: 'app/faqs/faqs.html',
                controller: 'faqsCtl'
            })
        .when('/faqs/:section',
            {
                templateUrl: 'app/partials/faqs.html',
                controller: 'faqsCtl'
            })
        .when('/messenger',
            {
                templateUrl: 'app/messenger/messenger.html',
                controller: 'messengerCtl'
            })
        .when('/messenger/:q',
            {
                templateUrl: 'app/messenger/messenger.html',
                controller: 'messengerCtl'
            })
        .otherwise({
            templateUrl: 'app/404/404.html',
            controller: 'notFoundCtl'
        });
}]);
app.config(["$httpProvider", function ($httpProvider) {
    'use strict';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}]);
app.config(['$locationProvider', function ($locationProvider) {
    'use strict';
    $locationProvider.html5Mode(true);
//Optional
}]);/*global app*/
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
}]);/*global app*/
/*global log*/
app.directive('enterKey', [function () {
    'use strict';
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.enterKey);
                });
                event.preventDefault();
            }
        });
    };
}]);
app.directive('anyKey', [function () {
    'use strict';
    return function (scope, element, attrs) {
        element.bind('keyup', function (event) {
            if ((event.which >= 65 && event.which <= 90) || event.which === 229 || event.which === 8) {
                scope.$apply(function () {
                    scope.$eval(attrs.anyKey);
                });
                event.preventDefault();
            }
        });
    };
}]);
app.directive('arrowKey', [function () {
    'use strict';
    return function (scope, element, attrs) {
        element.bind('keyup', function (event) {
            log(event);
            if ((event.which >= 65 && event.which <= 90) || event.which === 229 || event.which === 8) {
                scope.$apply(function () {
                    scope.$eval(attrs.anyKey);
                });
                event.preventDefault();
            }
        });
    };
}]);

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
