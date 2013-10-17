define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_common.controllers')
  .controller('CSHome', [
    '$scope',
    function ($scope) {
      $scope.welcome = 'Hello clever!';
    }

  ]);
});
