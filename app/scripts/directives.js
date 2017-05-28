/*global app*/
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
app.directive('aHeader', [function () {
    'use strict';
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            window.console.log('working');
        }
    };
}]);
app.directive('aAd', [function () {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'app/partials/ad.html',
        link: function (scope, element, attrs) {
        }
    };
}]);
