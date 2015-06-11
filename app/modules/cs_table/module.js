define(['angular'], function(ng) {
  'use strict';

  ng.module('cs_table.controllers', []);
  ng.module('cs_table.directives', []);

  var module = ng.module('cs_table', [
    'ngSanitize',
    'ui',
    'ui.bootstrap',
    'ngTable',
    'ngTableResizableColumns',
    'cs_table.controllers',
    'cs_table.directives'
  ]);

  return module;
});
