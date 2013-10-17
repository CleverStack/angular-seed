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
    function ($routeProvider, CSTemplate) {

      $routeProvider
        .when('/login', {
          template: 'LOGIN',
          // templateUrl: CSTemplate.view('login'),
          controller: 'CSLoginController',
          public: true
        })
        .when('/logout', {
          templateUrl: CSTemplate.view('login'),
          controller: 'CSLogoutController',
          public: true
        });
    }

  ]);

  return module;

});
