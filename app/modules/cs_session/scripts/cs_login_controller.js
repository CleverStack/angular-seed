define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_session.controllers')
  .controller('CSLoginController', [
    '$scope',
    'CSSession',
    'CSSessionHelpers',
    '$log',
    function ($scope, CSSessionProvider, CSSessionHelpersProvider, $log) {
      $scope.helpers = CSSessionHelpersProvider;

      $scope.login = function () {
        CSSessionProvider.login($scope.credentials);
      };

      $scope.$on('CSSessionProvider:loginFailure', function (event, data) {
        $log.log('CSLoginController:', event, data);
        if(data === '403') {
          $log.error('Invalid username/password');
        }
      });

    }
  ]);

});
