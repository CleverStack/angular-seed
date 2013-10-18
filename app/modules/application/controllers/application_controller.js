define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('app.controllers')
  .controller('ApplicationController', [
    '$scope',
    'Helpers',
    'CSTemplate',
    function ($scope, HelpersProvider, CSTemplateProvider) {
      $scope.helpers = HelpersProvider;
      $scope.tpl = CSTemplateProvider;
    }

  ]);
});
