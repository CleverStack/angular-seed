define(['angular', 'application'], function (ng) {
  'use strict';

  ng.module('app.controllers')
  .controller('AppCtrl', [
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
