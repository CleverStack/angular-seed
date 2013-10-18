define(['angular'], function (ng) {
  'use strict';

  ng.module('app.providers', []);
  ng.module('app.controllers', []);
  ng.module('app.services', []);

  var module = ng.module('app', [
    'cs_account',
    'cs_common',
    'cs_session',
    'users',
    'app.providers',
    'app.controllers',
    'app.services'
  ]);

  module.config([
    '$routeProvider',
    '$locationProvider',
    '$injector',
    'CSTemplateProvider',
    'CSHttpOptionsProvider',
    'CSSessionProvider',
    'HelpersProvider',
    function ($routeProvider, $locationProvider, $injector, CSTemplateProvider, CSHttpOptionsProvider, CSSessionProvider, HelpersProvider) {

      HelpersProvider.extend('CSCommonHelpers');

      CSTemplateProvider.setPath('/modules/application/views');

      // CSHttpOptionsProvider.setDomain('/api');

      CSSessionProvider.setSessionService('CSSessionService');

      $locationProvider.html5Mode(true);

      $routeProvider
        .when('/', {
          templateUrl: CSTemplateProvider.view('home'),
          controller: 'HomeController',
          public: true
        });

    }

  ]);

  return module;

});
