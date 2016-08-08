define(['angular', 'application'], function (ng) {
  'use strict';

  ng.module('cs_timezone.services')
    .factory('TimezoneService', [
    '$resource',
    function ($resource) {
      return $resource('/timezone/:id/:action', {id: '@id'});
    }
  ]);
});
