/*global app*/
/*global log*/
app.controller('accountCtl', ['$scope', '$http', '$location', '$cookies', function ($scope, $http, $location, $cookies) {
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
    function init() {
        if (typeof $cookies.get('token') === 'undefined') {
            $http.get('/api/campuses.json', {cache: true}).then(function (res) {
                self.insties = res.data;
                $scope.instList = self.insties;
            });
            $scope.accountState = self.REGISTER;
        } else {
            $scope.accountState = self.MAIN;
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
        } else if (typeof $scope.formData.campusId === 'undefined') {
            $scope.error(3);
            $scope.errMsg = 'Campus isn\'t selected';
        } else {
            $scope.error(-1);
            return true;
        }
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
    $scope.formData = {
        email: 'sdu@gum.com'
    };
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
    $scope.toRecovery = function () { $scope.accountState = self.RECOVERY; };
    $scope.toRegister = function () { $scope.accountState = self.REGISTER; };
    $scope.toLogin = function () { $scope.accountState = self.LOGIN; };
    $scope.logIn = function () { $scope.accountState = self.MAIN; };
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
        isDataValid($scope.formData);
        var data = JSON.parse(JSON.stringify($scope.formData));
        delete data.rePwd;
    };

    init();
}]);
app.controller('homeCtl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    'use strict';
    $scope.title = 'Some demo text and more testimonial bitch';
    function init() {
        $http.get('/api/ads.json').then(function (res) {
        }, function (err) {
            log(err);
        });
    }
    $scope.viewAd = function (i) {
        $location.url('/ads/' + i);
    };
    init();
}]);
app.controller('adsCreateCtl', ['$scope', '$location', function ($scope, $location) {
    'use strict';
    $scope.cat = false;
    $scope.display = '- Choose category - ';
    $scope.cats = [
        {id: 1, name: "Books & Study Material"},
        {id: 2, name: "Electronics & Gadgets"},
        {id: 3, name: "Phones & Laptops"},
        {id: 4, name: "Services & Other"}
    ];
    $scope.cancelAd = function () {
        $location.url('/account');
    };
    $scope.show = function () {
        $scope.cat = true;
    };
    $scope.sel = function (i) {
        $scope.display = $scope.cats[i].name;
        $scope.cat = false;
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
    if ($routeParams.hasOwnProperty('cat')) {
        $scope.search = 1;
        $scope.sSection = 1;
    }
    $scope.back = function () {
        if ($scope.search) {
            $location.url('/ads/search');
        } else {
            $location.url('/home');
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
app.controller('landingCtl', ['$scope', '$http', 'AppStore', '$location', function ($scope, $http, AppStore, $location) {
    'use strict';
    var insties = [];
    $http.get('/api/campuses.json').then(function (res) {
        insties = res.data;
        var i = 0;
        $scope.list = [];
        insties.forEach(function (x) {
            $scope.list.push(x);
        });
    }, function (err) {
        log(err);
    });
    $scope.state = 0;
    $scope.browse = function (i) {
        if ($scope.state === 0) {
            $scope.iName = insties[i].name;
            $scope.list = [];
            insties[i].campuses.forEach(function (x) {
                $scope.list.push(x);
            });
            $scope.state = 1;
        } else {
            AppStore.setCampus($scope.list[i].id, $scope.list[i].name);
            $location.url('/home');
        }
    };
    $scope.change = function () {
        $scope.state = 0;
        $scope.list = [];
        insties.forEach(function (x) {
            $scope.list.push(x);
        });
    };
    $scope.getStarted = function () {
        if (AppStore.isNew()) {
            $scope.dialog = true;
        } else {
            $location.url('/home');
        }
    };
}]);
app.controller('notFoundCtl', [function () {
    'use strict';
}]);
