define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_account.controllers')
  .controller('CSAccountCreateController', [
    '$scope',
    '$log',
    'CSAccount',
    function ($scope, $log, CSAccountProvider) {

      $scope.register = function () {
        CSAccountProvider.register($scope.credentials);
      };

      $scope.$on('CSAccountProvider:registrationFailure', function (event, data) {
        $log.log('CSAccountCreateController:', data);
      });

    }

  ]);

});
