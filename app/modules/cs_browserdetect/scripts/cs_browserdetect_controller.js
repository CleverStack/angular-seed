define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_browserdetect.controllers')
  .controller('CSBrowserdetectCtrl', [
    '$scope',
    'CSBrowserDetectService',
    function ($scope, $CSBrowserDetectService) {
      $scope.browserdetect = 'Browserdetect Module';
      console.log($CSBrowserDetectService.browser);
    }

  ]);

});
