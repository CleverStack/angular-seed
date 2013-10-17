define(['angular'], function (ng) {
  'use strict';

  console.log('app bootstrap');

  ng.module('app.providers', []);
  ng.module('app.controllers', []);
  ng.module('app.services', []);

  var module = ng.module('app', [
    'cs_common',
    'cs_session',
    'app.providers',
    'app.controllers',
    'app.services'
  ]);

  return module;

});
