define(['angular', '../module'], function(ng) {
  'use strict';

  ng
  .module('cs_common.directives')
  .directive('cleverTable', function($timeout) {
    return {
      restrict: 'A',
      scope: true,
      templateUrl: '/modules/cs_common/views/table.html',
      controller: 'CleverTableController',
      link: function postLink(elem, attrs, transclude) {
        $timeout(function () {
          ng.element(window).trigger('resize');
        }, 0);
      }
    };
  });

});
