/*global app*/
/*global log*/
/*global Chartist*/
app.directive('lineChart', [function () {
    'use strict';
    return {
        restrict: 'EA',
        template : '<div class="ct-chart ct-octave"></div>',
        link: function (scope, elem, attr) {
            scope.data = [[100, 120, 180, 200, 400]];
            var lastValues = [],
                chartElement = elem[0].querySelector('.ct-chart'),
                options = {
                    showPoint: false,
                    lineSmooth: false,
                    showArea: true,
                    axisX: {
                        showGrid: false
                    },
                    axisY: {
                        showGrid: false
                    }
                },
                chart = new Chartist.Line(chartElement, {
                    labels: ['one', 'two', 'three', 'four', 'five'],
                    series: scope.data
                }, options);

        }
    };
}]);
