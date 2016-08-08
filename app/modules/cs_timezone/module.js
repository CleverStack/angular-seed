define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_timezone.directives', []);
  ng.module('cs_timezone.services', []);

  var module = ng.module('cs_timezone', [
    'cs_common',
    'cs_timezone.directives',
    'cs_timezone.services'
  ]);

  return module;
});
