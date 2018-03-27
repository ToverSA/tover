/*global app*/
/*global log*/
/*global Chartist*/
app.directive('pieChart', [function () {
    'use strict';
    return {
        restrict: 'EA',
        template : '<div class="ct-chart ct-square"></div>',
        link: function (scope, elem, attr) {
            scope.data = [200, 400];
            var lastValues = [],
                chartElement = elem[0].querySelector('.ct-chart'),
                options = {
                    donut: true,
                    donutSolid: true,
                    donutWidth: 40,
                    showLabel: true
                },
                chart = new Chartist.Pie(chartElement, {
                    labels: [],
                    series: scope.data
                }, options); //.on('draw', draw).on('created', created);

        }
    };
}]);
