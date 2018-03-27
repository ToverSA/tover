/*global app*/
/*global log*/
app.directive('sidebar', ['$location', function ($location) {
    'use strict';
    return {
        restrict: 'AE',
        templateUrl: 'dash/sidebar/sidebar.html',
        link: function (s, a, e) {
            s.goto = function (n) {
                $location.url(n);
                log(n);
            };
        },
        replace: true
    };
}]);
