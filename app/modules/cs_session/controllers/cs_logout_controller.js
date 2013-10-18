define(['angular', '../module'], function (ng) {
  'use strict';
  console.log('logout loaded');
  ng.module('cs_session.controllers')
  .controller('CSLogoutController', [
    '$scope',
    'CSSession',
    function ($scope, CSSessionProvider) {
      console.log('currentUser', $scope.currentUser);
      CSSessionProvider.logout();

    }
  ]);

});
