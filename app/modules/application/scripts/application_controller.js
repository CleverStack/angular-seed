define(['angular', '../module'], function (ng, qwe) {
  'use strict';

  ng.module('app.controllers')
  .controller('ApplicationController', [
    '$scope',
    'Helpers',
    'CSTemplate',
    'CSSession',
    function ($scope, HelpersProvider, CSTemplateProvider, CSSessionProvider) {
      $scope.helpers = HelpersProvider;
      $scope.tpl = CSTemplateProvider;

      $scope.$watch(CSSessionProvider.getCurrentUser, function (user) {
        $scope.currentUser = user || false;
      });

    }

  ]);
});
