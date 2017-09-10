/*global app*/
app.controller('headerCtl', [function () {
    'use strict';
}]);
app.directive('statusBar', ['$location', function ($location) {
    'use strict';
    return {
        restrict: 'AE',
        templateUrl: 'dash/statusbar/statusbar.html',
        replace: true
    };
}]);
