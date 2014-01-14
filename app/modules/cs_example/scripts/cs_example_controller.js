define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_example.controllers')
  .controller('CSExampleController', [
    '$scope',
    function ($scope) {
      $scope.something = 'Example Module';
    }

  ]);

});
