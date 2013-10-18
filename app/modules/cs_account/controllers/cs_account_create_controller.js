define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_account.controllers')
  .controller('CSAccountCreateController', [
    '$scope',
    '$log',
    'CSAccount',
    'CSAccountHelpers',
    function ($scope, $log, CSAccountProvider, CSAccountHelpersProvider) {
      $scope.helpers = CSAccountHelpersProvider;

      $scope.register = function () {
        if($scope.form && $scope.form.$invalid){
          $log.error('Please fix form errors and try again.');
          return;
        }

        CSAccountProvider.register($scope.credentials);
      };

      $scope.$on('CSAccountProvider:registrationFailure', function (event, data) {
        $log.log('CSAccountCreateController:', data);
      });

    }

  ]);

});
