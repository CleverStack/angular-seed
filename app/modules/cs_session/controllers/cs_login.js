define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_session.controllers')
  .controller('CSLogin', [
    '$scope',
    'CSAuth',
    '$log',
    function ($scope, CSAuth, $log) {

      $scope.login = function () {
        CSAuth.login($scope.credentials);
      };

      $scope.$on('CSAuth:loginFailure', function (event, data) {
        $log.log('LoginController:', event, data);
        if(data === '403') {
          $log.error('Invalid username/password');
        }
      });

    }
  ]);

});
