define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('users.controllers')
  .controller('UsersController', [
    '$scope',
    'CSAccountService',
    function ($scope, CSAccountService) {
      $scope.welcome = 'This is a private area.';
      $scope.users = [];
      CSAccountService.list().then(function (users) {
        $scope.users = users;
      });
    }

  ]);
});
