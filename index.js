import './styles/app.scss';
var ng = require('angular');
var ngRoute = require('angular-route');

var app = ng.module('app', [ngRoute]);

app.controller('testCtl', function () {
  console.log('This is just a demo');
});
