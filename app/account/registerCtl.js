/*global app*/
/*global log*/
/*global $*/
app.controller('registerCtl', ['$scope', '$http', '$location', 'AppStore', function ($scope, $http, $location, AppStore) {
    'use strict';
    var self = this,
        insties;
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
    function isNumberValid(data) {
        if (typeof data === 'undefined' || data.length !== 10) {
            $scope.errMsg = 'Cellphone digits must be 10 characters long';
            return false;
        } else {
            return true;
        }
    }
    function isNameValid(data) {
        if (typeof data === 'undefined' || data.length < 3) {
            $scope.errMsg = 'Name must have at least 4 characters';
            return false;
        } else if (data.search(/[a-z]/i) < 0) {
            $scope.errMsg = 'Your name must contain at least one letter.';
            return false;
        } else {
            return true;
        }
    }
    function isDataValid(data) {
        if (!isEmailValid(data.email)) {
            $scope.err = true;
            return false;
        } else if (!isPasswordValid(data.password)) {
            $scope.err = true;
            return false;
        } else if (!isNameValid(data.dName)) {
            $scope.err = true;
            return false;
        } else if (!isNumberValid(data.number)) {
            $scope.err = true;
        } else if (typeof $scope.formData.campusId === 'undefined') {
            $scope.err = true;
            $scope.errMsg = 'Campus isn\'t selected';
        } else {
            $scope.err = false;
            return true;
        }
    }
    function auth(e, p) {
        var data = {email: e.toLowerCase(), password: p};
        $http.post('api.php/v1/users/auth', $.param(data)).then(function (res) {
            AppStore.setToken(res.data.token);
            AppStore.setUserId(res.data.id);
            if (typeof $location.search().redirect !== 'undefined') {
                $location.url($location.search().redirect);
            } else {
                $location.url('/account?rel=console');
            }
        }, function (err) {
            //TODO handle auth errors
        });
    }
    $scope.lTitle = '- Select your campus -';
    $scope.formData = {};
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
    $http.get('api.php/v1/campuses', {cache: true}).then(function (res) {
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