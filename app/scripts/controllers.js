/*global app*/
/*global log*/
/*global $*/
/*global FileReader*/
app.controller('accountCtl', ['$scope', '$http', '$location', 'AppStore', function ($scope, $http, $location, AppStore) {
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
        var data = {email: e, password: p};
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
    $scope.toRecovery = function () { $scope.accountState = self.RECOVERY; };
    $scope.toRegister = function () { $scope.accountState = self.REGISTER; };
    $scope.toLogin = function () { $scope.accountState = self.LOGIN; };
    $scope.toLogin = function () { $scope.accountState = self.LOGIN; };
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
        isDataValid($scope.formData);
        var data = JSON.parse(JSON.stringify($scope.formData));
        delete data.rePwd;
        $http.post('/api.php/v1/users/new', $.param(data)).then(function (res) {
            auth(data.email, data.password);
        }, function (err) {
            //TODO handle user creation error
        });
    };

    init();
}]);
app.controller('homeCtl', ['$scope', '$http', '$location', 'AppStore', function ($scope, $http, $location, AppStore) {
    'use strict';
    $scope.title = 'Some demo text and more testimonial bitch';
    function init() {
        $http.get('api.php/v1/ads?cid=' + AppStore.getCampusId()).then(function (res) {
            $scope.ads = res.data;
        }, function (err) {
            //TODO handle error for get ads here
        });
    }
    $scope.campus = AppStore.getCampusName();
    $scope.viewAd = function (i) {
        $location.url('/ads/' + i);
    };
    init();
}]);
app.controller('adsCreateCtl', ['$scope', '$location', '$http', 'AppStore', function ($scope, $location, $http, AppStore) {
    'use strict';
    $scope.cat = false;
    $scope.display = '- Choose category - ';
    $scope.cats = [
        {id: 1, name: "Books & Study Material"},
        {id: 2, name: "Electronics & Gadgets"},
        {id: 3, name: "Phones & Laptops"},
        {id: 4, name: "Services & Other"}
    ];
    $scope.dummy = [1, 2, 3, 4, 5];
    $scope.images = [];
    $scope.ad = {
        images: []
    };
    var reader = new FileReader();
    reader.onload = function () {
        $scope.images.push(reader.result);
        $scope.dummy.splice(-1);
        $scope.$apply();
    };
    $scope.clear = function (i) {
        if ($scope.images.length !== 6) {
            $scope.dummy.push($scope.dummy.length + 1);
        }
        $scope.images.splice(i, 1);
    };
    $scope.cancelAd = function () {
        $location.url('/account');
    };
    $scope.show = function () {
        $scope.cat = true;
    };
    $scope.sel = function (i) {
        $scope.ad.category = $scope.cats[i].id;
        $scope.display = $scope.cats[i].name;
        $scope.cat = false;
    };
    $scope.back = function () {
        $scope.aPage -= 1;
        if ($scope.aPage === 2) {
            $scope.dummy.splice(-1);
        }
    };
    $scope.step = function () {
        if ($scope.aPage === 1) {
            $scope.aPage += 1;
        } else if ($scope.aPage === 2) {
            $scope.aPage += 1;
            $scope.dummy.push($scope.dummy.length + 1);
        } else if ($scope.aPage === 3) {
            $scope.ad.userId = AppStore.getUserId();
            $scope.ad.images = [];
            $scope.images.forEach(function (x) {
                $scope.ad.images.push(x.substring(x.indexOf(',') + 1));
            });
            $http.post('api.php/v1/ads', $.param($scope.ad),
                       { headers: {'token': AppStore.getToken()} }).then(function (res) {
                $location.url('/account');
            }, function (err) {
                //TODO handle advert error
            });
        }
    };
    $scope.fileNameChanged = function (files) {
        reader.readAsDataURL(files[0]);
    };
}]);
app.controller('adsCtl', ['$scope', '$timeout', '$location', '$http', '$routeParams', 'AppStore', function ($scope, $timeout, $location, $http, $routeParams, AppStore) {
    'use strict';
    function init() {
        if (typeof $routeParams.id !== 'undefined') {
            $http.get('api.php/v1/ads?id=' + $routeParams.id).then(function (res) {
                $scope.ad = res.data;
                $scope.cover = $scope.ad.src_id.splice(0, 1);
                $scope.dummy = new Array(5 - $scope.ad.src_id.length);
                //$scope.dummy
                var i = 0;
                for (i = 0; i < $scope.dummy.length; i += 1) {
                    $scope.dummy[i] = i;
                }
            }, function (err) {
                //TODO handle geting ads error
            });
        }
    }
    $scope.isGuest = true;
    $scope.sendMessage = function () {
        $scope.state = 2;
        $timeout(function () {
            $scope.state = -1;
        }, 1000);
    };
    $scope.userClicked = function () {
        $location.url('/ads/search?u=' + $scope.ad.uid
                      + '&name=' + $scope.ad.name);
    };
    $scope.reportAd = function (id) {
        //TODO implement dialog for this
    };
    init();
}]);
app.controller('adsSearchCtl', ['$scope', '$routeParams', '$location', '$http', 'AppStore', function ($scope, $routeParams, $location, $http, AppStore) {
    'use strict';
    var insties = [],
        state = 0,
        prefs,
        isPrefChanged = false;
    $http.get('api.php/v1/campuses', {cache: true}).then(function (res) {
        insties = res.data;
        var i = 0;
        $scope.list = [];
        insties.forEach(function (x) {
            $scope.list.push(x);
        });
    }, function (err) {
        //TODO error requesting campuses
    });
    $scope.browse = function (i) {
        if (state === 0) {
            $scope.mSub += ' > ' + insties[i].name;
            $scope.list = [];
            insties[i].campuses.forEach(function (x) {
                $scope.list.push(x);
            });
            state = 1;
        } else {
            AppStore.clearAll();
            AppStore.setCampus($scope.list[i].id, $scope.list[i].name);
            $scope.cName = $scope.list[i].name;
            $scope.mState = 0;
            $scope.mSub = '';
            $scope.list = insties;
            state = 0;
            $scope.query = '';
            $scope.sSection = 0;
            $scope.opt = false;
            $location.url('/ads/search');
        }
    };
    $scope.cName = AppStore.getCampusName();
    $scope.query = '';
    $scope.sSection = 0;
    function search() {}
    if (typeof $routeParams.q !== 'undefined') {
        $scope.query = $routeParams.q;
        $scope.sSection = 1;
    } else if (typeof $routeParams.u !== 'undefined') {
        if (typeof $routeParams.name !== 'undefined') {
            $scope.sSection = 2;
            $scope.query = $routeParams.name;
        }
    }
    function reload() {}
    $scope.ad = [];
    function isMatch() {
        if ($scope.ad.length === 0) {
            return false;
        } else {
            var match = false,
                rem = [];
            $scope.ad.forEach(function (x) {
                var a = x.title.toLowerCase(),
                    b = $scope.query.toLowerCase(),
                    c = a.match(b);
                if (c === null) {
                    rem.push($scope.ad.indexOf(x));
                } else {
                    match = true;
                }
            });

            rem.forEach(function (x) {
                $scope.ad.splice(x, 1);
            });
            return match;
        }
    }
    function suggestions() {
        $http.get('api.php/v1/ads?cid='
                  + AppStore.getCampusId()
                  + '&q='
                  + $scope.query).then(function (res) {
            $scope.ad = res.data;
        }, function (err) {
            //TODO sugestions error
        });
        $http.get('api.php/v1/users?cid='
                  + AppStore.getCampusId()
                  + '&q='
                  + $scope.query).then(function (res) {
            $scope.user = res.data;
        }, function (err) {
            //TODO sugestions error
        });
    }
    $scope.back = function () {
        if ($scope.search) {
            $location.url('/ads/search');
        } else {
            $location.url('/home');
        }
    };
    $scope.menuBack = function () {
        if ($scope.mState > 0) {
            $scope.mState = 0;
            $scope.mSub = '';
            $scope.list = [];
            insties.forEach(function (x) {
                $scope.list.push(x);
            });
            state = 0;
        } else {
            $scope.opt = false;
            $location.url('/ads/search');
            reload();
        }
    };
    $scope.viewUser = function (i, j) {
        $location.url('/ads/search?u=' + i + '&name=' + j);
    };
    $scope.viewAd = function (i) {
        $location.url('/ads/' + i);
    };
    $scope.suggest = function () {
        if (!$scope.isTyping) {
            $scope.isTyping = true;
            $scope.sSection = 0;
        }
        if ($scope.query.length > 1) {
            if (!isMatch()) {
                suggestions();
            }
        }
    };
    $scope.searchFor = function () {
        if ($scope.query.length > 1) {
            $location.url('/ads/search/?q=' + $scope.query);
        }
    };
    $scope.changeCampus = function () {
        $scope.mState = 1;
        $scope.mSub = 'Campus';
    };
    $scope.cats = [
        {id: 1, label: 'All categories'},
        {id: 2, label: 'Books & Study Materials'},
        {id: 3, label: 'Electronics & Gadgets'},
        {id: 4, label: 'Phones & Laptops'},
        {id: 5, label: 'Services & Other'}
    ];
    $scope.changeCategory = function (i) {
        if (typeof i === 'undefined') {
            $scope.mState = 2;
            $scope.mSub = 'Category';
        } else {
            log($scope.cats[i]);
            prefs[0] = $scope.cats[i];
            AppStore.setSearchPrefs(prefs);
            $scope.catLabel = $scope.cats[i].label;
            $scope.mState = 0;
            $scope.mSub = '';
        }
    };
    $scope.sorts = [
        {id: 1, label: 'Latest'},
        {id: 2, label: 'Top viewed'},
        {id: 3, label: 'Price (lowest to highest)'},
        {id: 4, label: 'Price (highest to lowest)'}
    ];
    $scope.changeSorting = function (i) {
        if (typeof i === 'undefined') {
            $scope.mState = 3;
            $scope.mSub = 'Sort By';
        } else {
            log($scope.sorts[i]);
            prefs[1] = $scope.sorts[i];
            AppStore.setSearchPrefs(prefs);
            $scope.sortLabel = $scope.sorts[i].label;
            $scope.mState = 0;
            $scope.mSub = '';
        }
    };
    prefs = AppStore.getSearchPrefs();
    if (prefs === false) {
        $scope.catLabel = $scope.cats[0].label;
        $scope.sortLabel = $scope.sorts[0].label;
        prefs = [$scope.cats[0], $scope.sorts[0]];
        AppStore.setSearchPrefs(prefs);
    } else {
        $scope.catLabel = prefs[0].label;
        $scope.sortLabel = prefs[1].label;
    }
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
    $http.get('api.php/v1/campuses', {cache: true}).then(function (res) {
        insties = res.data;
        var i = 0;
        $scope.list = [];
        insties.forEach(function (x) {
            $scope.list.push(x);
        });
    }, function (err) {
        //TODO error requesting campuses
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
