/*global app*/
/*global log*/
app.controller('accountCtl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
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

    function init() {
        $http.get('/api/access.json').then(function (res) {
            if (res.data.access === true) {
                $scope.accountState = self.MAIN;
            } else {
                $scope.accountState = self.LOGIN;
            }
        }, function (err) {});
    }

    $scope.toRecovery = function () { $scope.accountState = self.RECOVERY; };
    $scope.toRegister = function () { $scope.accountState = self.REGISTER; };
    $scope.toLogin = function () { $scope.accountState = self.LOGIN; };
    $scope.logIn = function () {
        $scope.accountState = self.MAIN;
    };
    $scope.delAcc = function () {
        $location.url('/account/delete');
    };
    $scope.faqs = function () {
        $location.url('/faqs/account');
    };
    $scope.createAd = function () {
        $location.url('/ads/create');
    };
    $scope.createNew = function () {
        $scope.accountState = self.MAIN;
    };
    init();
}]);
app.controller('homeCtl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    'use strict';
    $scope.title = 'Some demo text and more testimonial bitch';
    function init() {
        $http.get('/api/ads.json').then(function (res) {
            log(res);
        }, function (err) {
            log(err);
        });
    }
    $scope.viewAd = function (i) {
        $location.url('/ads/' + i);
        $http.delete('everything');
    };
    init();
}]);
app.controller('adsCreateCtl', ['$scope', '$location', function ($scope, $location) {
    'use strict';
    $scope.cancelAd = function () {
        $location.url('/account');
    };
    $scope.back = function () {
        $scope.aPage -= 1;
    };
    $scope.step = function () {
        if ($scope.aPage === 1) {
            $scope.aPage += 1;
        } else if ($scope.aPage === 2) {
            $scope.aPage += 1;
        } else if ($scope.aPage === 3) {
            $location.url('/account');
        }
    };
}]);
app.controller('adsCtl', ['$scope', '$timeout', '$location', function ($scope, $timeout, $location) {
    'use strict';
    $scope.isGuest = true;
    $scope.sendMessage = function () {
        $scope.state = 2;
        $timeout(function () {
            $scope.state = -1;
        }, 1000);
    };
    $scope.reportAd = function (id) {
        //TODO implement dialog for this
    };
}]);
app.controller('adsSearchCtl', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
    'use strict';
    log($routeParams);
    if ($routeParams.hasOwnProperty('cat')) {
        $scope.search = 1;
        $scope.sSection = 1;
    }
    $scope.back = function () {
        if ($scope.search) {
            $location.url('/ads/search');
        } else {
            $location.url('/');
        }
    };
    $scope.toCat = function (c) {
        $location.url('/ads/search/?cat=' + c);
    };
    $scope.viewAd = function (i) {
        $location.url('/ads/' + i);
    };
}]);
app.controller('faqsCtl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    'use strict';
    log($routeParams);
}]);
app.controller('delAccCtl', ['$scope', '$location', function ($scope, $location) {
    'use strict';
    $scope.cancel = function () {
        $location.url('/account');
    };
    $scope.conf = function () {};
}]);
