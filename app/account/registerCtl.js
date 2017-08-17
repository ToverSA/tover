/*global app*/
/*global log*/
/*global $*/
app.controller('registerCtl', ['$scope', '$location', 'AppStore', 'httpFacade', function ($scope, $location, AppStore, httpFacade) {
    'use strict';
    var self = this,
        insties;
    function isDataValid(data) {
        if (typeof data.name === 'undefined' || data.name.length === 0) {
            $scope.err = true;
            $scope.errMsg = 'Display name is empty';
            return false;
        } else if (typeof data.email === 'undefined' || data.email.length === 0) {
            $scope.err = true;
            $scope.errMsg = 'Email is empty';
        } else if (data.email.search(/^.+@.+\..+$/) !== 0) {
            $scope.err = true;
            $scope.errMsg = 'Email is must contain @ and .';
        } else if (typeof data.number === 'undefined' || data.number.length === 0) {
            $scope.err = true;
            $scope.errMsg = 'Cellphone number empty';
        } else if (data.number.search(/\b\d{10}/) !== 0) {
            $scope.err = true;
            $scope.errMsg = 'Your number must be 10 numbers long with no letters or symbols';
        } else if (typeof data.campusId === 'undefined') {
            $scope.err = true;
            $scope.errMsg = 'Please choose your campus';
        } else if (typeof data.password === 'undefined' || data.password.length === 0) {
            $scope.err = true;
            $scope.errMsg = 'Password cannot be empty';
        } else if (typeof data.rePwd === 'undefined' || data.password !== data.rePwd) {
            $scope.err = true;
            $scope.errMsg = 'Passwords do not match';
        } else {
            return true;
        }
    }
    function auth(e, p) {
        //NOTE Email with more than one dot have weird behaivor
        var data = {email: e.toLowerCase(), password: p};
        httpFacade.authUser($.param(data)).then(function (res) {
            $scope.$emit('STOP_LOADING');
            AppStore.setUserId(res.data.id);
            AppStore.setToken(res.data.token);
            $location.url('/account');
        }, function (err) {
            $scope.$emit('STOP_LOADING');
            if (err.status === 401) {
                $scope.$emit('START_LOADING');
                $location.url('/account?rel=verify&email=' + $scope.formData.email + '&from=register');
            } else {
                $scope.$emit('ERROR', {code: err.status, desc: err.data});
            }
//            $scope.$emit('ERROR', {code: err.status, desc: err.data});
        });
    }
    $scope.lTitle = '- Select your campus -';
    $scope.formData = {
        name: 'Sdu',
        email: 'sdu@gum.com',
        number: '0604335310',
        password: 'plo0',
        rePwd: 'plo0'
    };
    $scope.cState = 0;
    $scope.changeC = function () {
        $scope.instList = insties;
        $scope.cState = 0;
    };
    $scope.openChooser = function () { $scope.isCOpen = true; };
    $scope.browse = function (i) {
        if ($scope.cState === 0) {
            $scope.sTitle = insties[i].name;
            $scope.instList = insties[i].campuses;
            $scope.cState = 1;
        } else {
            $scope.formData.campusId = $scope.instList[i].id;
            $scope.isCOpen = false;
            $scope.lTitle = $scope.instList[i].name;
        }
    };
    $scope.createNew = function () {
        $scope.err = false;
        $scope.errMsg = '';
        if (isDataValid($scope.formData)) {
            $scope.formData.email = $scope.formData.email.toLowerCase();
            var data = JSON.parse(JSON.stringify($scope.formData));
            delete data.rePwd;
            $scope.$emit('START_LOADING');
            httpFacade.newUser($.param(data)).then(function (res) {
                auth(data.email, data.password);
            }, function (err) {
                $scope.$emit('STOP_LOADING');
                $scope.$emit('ERROR', {code: err.status, desc: err.data});
            });
        }
    };
    httpFacade.getCampuses().then(function (res) {
        insties = res.data;
        var i = 0;
        $scope.instList = [];
        insties.forEach(function (x) {
            $scope.instList.push(x);
        });
    }, function (err) {
        //TODO error requesting campuses
    });
}]);
