define(['app'], function (app) {
  'use strict';

  app.controller('Registration', ['$scope','$auth', '$location'
  , function ($scope, $auth, $location) {
    $scope.register = function () {
      $auth.register($scope.credentials);
    }

    $scope.$on('$auth:registrationFailure', function (event, data) {
      console.log("RegistrationController:",event,data);
      if(data === '403') {
        alert('Invalid username/password');
      } 
    });
  }]);
});