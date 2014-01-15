define(['angular', 'underscore', '../module'], function (ng, _) {
  'use strict';

  ng.module('cs_account.controllers')
  .controller('CSAccountCreateController', [
    '$scope',
    '$log',
    'CSAccount',
    'CSAccountHelpers',
    'CSSession',
    '$location',
    function ($scope, $log, CSAccountProvider, CSAccountHelpersProvider, CSSessionProvider, $location) {
      $scope.helpers = CSAccountHelpersProvider;

      $scope.register = function () {
        if($scope.form && $scope.form.$invalid){
          $log.error('Please fix form errors and try again.');
          return;
        }

        var credentials = _($scope.credentials).omit('passwordConfirmation');
        credentials.username = credentials.email.split('@')[0];
        CSAccountProvider.register(credentials);
      };

      $scope.$on('CSAccountProvider:registrationSuccess', function(event, user){
        CSSessionProvider.authenticate(user);
        $location.url('/users');
      });

      $scope.$on('CSAccountProvider:registrationFailure', function (event, data) {
        $log.log('CSAccountCreateController:', data);
      });

    }

  ]);

});
