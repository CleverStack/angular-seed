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

  module.config([
    '$routeProvider',
    'CSTemplateProvider',
    'CSSessionHelpersProvider',
    function ($routeProvider, CSTemplate, CSSessionHelpersProvider) {

      CSSessionHelpersProvider.extend('CSCommonHelpers');

      CSTemplate.setPath('/modules/cs_session/views');

      $routeProvider
        .when('/login', {
          templateUrl: CSTemplate.view('login'),
          controller: 'CSLoginController',
          public: true
        })
        .when('/logout', {
          controller: 'CSLogoutController',
          public: true
        });
    }

  ]);

  return module;

});
