/*global app*/
/*global log*/
/*global $*/
app.controller('adsSearchCtl', ['$scope', '$routeParams', '$location', '$http', 'AppStore', function ($scope, $routeParams, $location, $http, AppStore) {
    'use strict';
    //NOTE search ctl
    var insties = [],
        state = 0,
        prefs,
        isPrefChanged = false,
        url = {};
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
            $location.url('/search');
        }
    };
    $scope.cName = AppStore.getCampusName();
    $scope.query = '';
    $scope.sSection = 0;
    function search() {}
    function reload(param) {
        $http.get('api.php/v1/ads?' + param).then(function (res) {
            $scope.ads = res.data;
            $scope.sLabel = prefs[1].label.toLowerCase();
            if (prefs[1].id > 2) {
                $scope.sLabel = 'price listed';
            }
        }, function (err) {
            //TODO ads error
        });
    }
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
                  + $scope.query
                  + '&a=n').then(function (res) {
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
            $location.url('/search');
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
            if ($scope.sSection !== 2 && $scope.query.length > 0) {
                $location.url('/search?q=' + $scope.query);
            } else {
                $location.url('/search');
            }
        }
    };
    $scope.viewUser = function (i, j) {
        $location.url('/search?u=' + i + '&name=' + j);
    };
    $scope.viewAd = function (i) {
        $location.url('/ads/' + i);
    };
    $scope.suggest = function () {
        if (!$scope.isTyping) {
            $scope.isTyping = true;
        }
        if ($scope.query.length > 1) {
            if (!isMatch()) {
                suggestions();
            }
        }
    };
    $scope.searchFor = function () {
        if ($scope.query.length > 1) {
            $location.url('/search/?q=' + $scope.query);
        }
    };
    $scope.changeCampus = function () {
        $scope.mState = 1;
        $scope.mSub = 'Campus';
    };
    $scope.cats = [
        {id: 0, label: 'All categories'},
        {id: 1, label: 'Books & Study Materials'},
        {id: 2, label: 'Electronics & Gadgets'},
        {id: 3, label: 'Phones & Laptops'},
        {id: 4, label: 'Services & Other'}
    ];
    $scope.changeCategory = function (i) {
        if (typeof i === 'undefined') {
            $scope.mState = 2;
            $scope.mSub = 'Category';
        } else {
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
    if (typeof $routeParams.q !== 'undefined') {
        $scope.query = $routeParams.q;
        $scope.sSection = 1;
        if (prefs[0].id !== 0) {
            url.c = prefs[0].id;
        }
        url.cid = AppStore.getCampusId();
        url.s = prefs[1].id;
        log($scope.sLabel);
        url.q = $routeParams.q;
        reload($.param(url));
    } else if (typeof $routeParams.u !== 'undefined') {
        if (typeof $routeParams.name !== 'undefined') {
            $scope.sSection = 2;
            $scope.query = $routeParams.name;
            url.uid = $routeParams.u;
            reload($.param(url));
        }
    }
}]);