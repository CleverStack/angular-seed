define(['app'], function (app) {
  'use strict';

  app.controller('Users', ['$scope', '$auth', function ($scope, $auth) {
  
    $scope.welcome = "This is a private area.";
  
  }]);

});