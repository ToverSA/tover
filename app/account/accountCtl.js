/*global app*/
/*global log*/
/*global $*/
app.controller('accountCtl', ['$scope', '$http', '$location', '$routeParams', 'AppStore', function ($scope, $http, $location, $routeParams, AppStore) {
    'use strict';
    var self = this;
    self.LOADING = 0;
    self.LOGIN = 1;
    self.REGISTER = 2;
    self.RECOVERY = 3;
    self.MAIN = 4;
    // Pages under main
    self.CONSOLE = 5;
    self.MESSAGES = 6;
    self.PREFERENCES = 7;
    self.FAQS = 8;
    self.insties = [];
    function loadAccount() {
        $scope.account.name = AppStore.getUserName();
        $scope.account.number = AppStore.getUserNumber();
        $scope.account.email = AppStore.getUserEmail();
        $scope.account.campus = AppStore.getCampusName();
    }
    function loadAds() {
        $http.get('api.php/v1/account/ads', {
            headers: {'token': AppStore.getToken()}
        }).then(function (res) {
            $scope.ads = res.data;
        }, function (err) {
            //TODO if getting ads renders an error
        });
    }
    function init() {
        if (!AppStore.isToken()) {
            $http.get('api.php/v1/campuses', {cache: true}).then(function (res) {
                self.insties = res.data;
                $scope.instList = self.insties;
            });
            $scope.accountState = self.LOGIN;
        } else {
            loadAccount();
            loadAds();
            $scope.accountState = self.MAIN;
        }
    }
    function isNumberValid(data) {
        if (typeof data === 'undefined' || data.length < 10) {
            $scope.errMsg = 'Cellphone diits must be 10 characters long';
            return false;
        } else {
            return true;
        }
    }
    function isNameValid(data) {
        if (typeof data === 'undefined' || data.length < 4) {
            $scope.errMsg = 'Name must have at least 4 characters';
            return false;
        } else if (data.search(/[a-z]/i) < 0) {
            $scope.errMsg = 'Your name must contain at least one letter.';
            return false;
        } else {
            return true;
        }
    }
    function isEmailValid(data) {
        var re = /\S+@\S+\.\S+/;
        return re.test(data);
    }
    function isPasswordValid(data) {
        if (typeof data === 'undefined' || data.length < 4) {
            $scope.errMsg = 'Password must have at least 4 characters';
            return false;
        } else if (data.search(/[a-z]/i) < 0) {
            $scope.errMsg = 'Your password must contain at least one letter.';
            return false;
        } else if (data.search(/[0-9]/) < 0) {
            $scope.errMsg = 'Your password must contain at least one digit.';
            return false;
        } else if (data.equals === $scope.formData.rePwd) {
            $scope.errMsg = 'Passwords do not match';
            return false;
        } else {
            return true;
        }
    }
    function isDataValid(data) {
        if (!isEmailValid(data.email)) {
            $scope.error(0);
            return false;
        } else if (!isPasswordValid(data.password)) {
            $scope.error(2);
            return false;
        } else if (!isNameValid(data.dName)) {
            $scope.error(1);
            return false;
        } else if (!isNumberValid(data.number)) {
            $scope.error(2);
        } else if (typeof $scope.formData.campusId === 'undefined') {
            $scope.error(3);
            $scope.errMsg = 'Campus isn\'t selected';
        } else {
            $scope.error(-1);
            return true;
        }
    }
    function getUser() {
        $http.get('api.php/v1/account', {
            headers: {'token': AppStore.getToken()}
        }).then(function (res) {
            AppStore.setCampus(res.data.campus.id, res.data.campus.name);
            AppStore.setUserId(res.data.id);
            AppStore.setUserName(res.data.name);
            AppStore.setUserEmail(res.data.email);
            AppStore.setUserNumber(res.data.number);
            loadAccount();
        }, function (err) {
            //TODO handle account errors
        });
    }
    function auth(e, p) {
        var data = {email: e.toLowerCase(), password: p};
        $http.post('api.php/v1/users/auth', $.param(data)).then(function (res) {
            AppStore.setToken(res.data.token);
            AppStore.setUserId(res.data.id);
            $scope.accountState = self.MAIN;
            getUser();
            loadAds();
        }, function (err) {
            //TODO handle auth errors
        });
    }
    $scope.error = function (code) {
        switch (code) {
        case 0:
            $scope.err = true;
            $scope.errMsg = 'Error in email format i.e. \'@\'';
            break;
        case 1:
            $scope.err = true;
            break;
        case 2:
            $scope.err = true;
            break;
        case 3:
            $scope.err = true;
            break;
        default:
            $scope.err = false;
        }
    };
    $scope.formData = {};
    $scope.authData = {};
    $scope.account = {};
    $scope.cState = 0;
    $scope.lTitle = '- Select your campus -';
    $scope.sTitle = '';
    $scope.openChooser = function () { $scope.isCOpen = true; };
    $scope.browse = function (i) {
        if ($scope.cState === 0) {
            $scope.sTitle = self.insties[i].name;
            $scope.instList = self.insties[i].campuses;
            $scope.cState = 1;
        } else {
            $scope.formData.campusId = $scope.instList[i].id;
            $scope.isCOpen = false;
            $scope.lTitle = $scope.instList[i].name;
        }
    };
    $scope.changeC = function () {
        $scope.instList = self.insties;
        $scope.cState = 0;
    };
    $scope.toRecovery = function () { $location.url('/account?rel=recovery'); };
    $scope.toRegister = function () { $location.url('/account?rel=register'); };
    $scope.toLogin = function () { $location.url('/account?rel=login'); };
    $scope.recover = function () {
        if (typeof $scope.recoveryMail === 'undefined') {
            $scope.err = true;
        } else {
            $scope.err = false;
            $http.post().then(function (res) {
                //TODO handle recovery
            });
        }
    };
    $scope.logIn = function () {
        if (typeof $scope.authData.email === 'undefined') {
            $scope.err = true;
            $scope.errMsg = 'Email field is empty!';
        } else if (typeof $scope.authData.password === 'undefined') {
            $scope.err = true;
            $scope.errMsg = 'Password field is empty!';
        } else {
            $scope.err = false;
            auth($scope.authData.email, $scope.authData.password);
        }
    };
    $scope.onEdit = function () {

    };
    $scope.delAcc = function () {
        $location.url('/account/delete');
    };
    $scope.faqs = function () {
        $location.url('/faqs/account');
    };
    $scope.logout = function () {
        AppStore.clearAll();
        $location.url('/home');
    };
    $scope.createAd = function () {
        $location.url('/ads/create');
    };
    $scope.createNew = function () {
        if (isDataValid($scope.formData)) {
            $scope.formData.email = $scope.formData.email.toLowerCase();
            var data = JSON.parse(JSON.stringify($scope.formData));
            delete data.rePwd;
            $http.post('/api.php/v1/users/new', $.param(data)).then(function (res) {
                auth(data.email, data.password);
            }, function (err) {
                //TODO handle user creation error
            });
        }
    };
    $scope.openAd = function (id) {
        $location.url('/ads/' + id);
    };
    init();
    log($routeParams);
    if (typeof $routeParams.rel === 'undefined') {
        if (AppStore.isToken()) {
            $location.url('/account?rel=console');
        } else {
            $location.url('/account?rel=login');
        }
    } else if ($routeParams.rel === 'console') {
        if (AppStore.isToken()) {
            $location.url('/account?rel=console');
        } else {
            $location.url('/account?rel=login');
        }
    } else {
        $location.url('/account?rel=' + $routeParams.rel);
    }
}]);