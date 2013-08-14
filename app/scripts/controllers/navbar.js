define(['app'], function (app) {
  'use strict';
  app.controller('NavBar', ['$scope', '$auth'
    , function ($scope, $auth) {
    $scope.user = false;
    $scope.$watch($auth.getCurrentUser, function () {
      $scope.user = $auth.getCurrentUser() || false;
    });
  }]);
});