define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_browserdetect.controllers')
  .controller('CSBrowserdetectCtrl', [
    '$scope',
    'CSBrowserDetectService',
    function ($scope, $CSBrowserDetectService) {
      $scope.browserdetect = $CSBrowserDetectService;
      console.log($scope.browserdetect);
    }

  ]);

});
