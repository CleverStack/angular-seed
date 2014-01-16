define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_messenger.directives', []);
  ng.module('cs_messenger.services', []);

  var module = ng.module('cs_messenger', [
    'cs_common',
    'cs_messenger.directives',
    'cs_messenger.services'
  ]);

  return module;
});
