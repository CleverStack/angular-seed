define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_common.controllers')
  .controller('CSHomeController', [
    '$scope',
    function ($scope) {
      $scope.welcome = 'Hello clever!';
    }

  ]);
});
