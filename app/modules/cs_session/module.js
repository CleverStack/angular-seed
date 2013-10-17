define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_session.providers', []);
  ng.module('cs_session.controllers', []);
  ng.module('cs_session.services', []);

  var module = ng.module('cs_session', [
    'cs_common',
    'cs_session.providers',
    'cs_session.controllers',
    'cs_session.services'
  ]);

  return module;

});
