/*global app*/
/*global log*/
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
app.directive('anyKey', [function () {
    'use strict';
    return function (scope, element, attrs) {
        element.bind('keyup', function (event) {
            if ((event.which >= 65 && event.which <= 90) || event.which === 229 || event.which === 8) {
                scope.$apply(function () {
                    scope.$eval(attrs.anyKey);
                });
                event.preventDefault();
            }
        });
    };
}]);
app.directive('arrowKey', [function () {
    'use strict';
    return function (scope, element, attrs) {
        element.bind('keyup', function (event) {
            log(event);
            if ((event.which >= 65 && event.which <= 90) || event.which === 229 || event.which === 8) {
                scope.$apply(function () {
                    scope.$eval(attrs.anyKey);
                });
                event.preventDefault();
            }
        });
    };
}]);

