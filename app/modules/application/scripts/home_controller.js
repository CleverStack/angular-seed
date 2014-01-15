define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('app.controllers')
  .controller('HomeController', [
    '$scope',
    'Helpers',
    function ($scope, Helpers) {
      $scope.welcome = 'Hello clever!';
    }

  ]);
});
