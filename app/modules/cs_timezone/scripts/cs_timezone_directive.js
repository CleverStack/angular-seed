define(['angular', 'application'], function (ng) {
  'use strict';

  ng.module('cs_timezone.directives')
  .directive('timezone', [
    'TimezoneService',
    function (TimezoneService) {

      /**
       * @description
       * The actual service.
       */
      return {
        restrict: 'E',
        template: '<select ng-options="timezone.id as \'(GMT\' + timezone.offset + \') \' + timezone.name for timezone in timezones"></select>',
        replace: true,
        link: function (scope, elem, attrs) {
          scope.timezones = TimezoneService.query();
        }
      };
    }
  ]);
});
