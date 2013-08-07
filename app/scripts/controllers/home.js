define(['app'], function (app) {
  'use strict';
  app.controller('Home', ['$scope', function ($scope) {
    $scope.welcome = "Hello there!";
  }]);
});