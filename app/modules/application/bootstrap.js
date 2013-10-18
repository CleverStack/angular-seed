define(['angular'], function (ng) {
  'use strict';

  console.log('app bootstrap');

  ng.module('app.providers', []);
  ng.module('app.controllers', []);
  ng.module('app.services', []);

  var module = ng.module('app', [
    'cs_account',
    'cs_common',
    'cs_session',
    'app.providers',
    'app.controllers',
    'app.services'
  ]);

  module.config([
    '$routeProvider',
    '$locationProvider',
    'CSTemplateProvider',
    'CSHttpOptionsProvider',
    'CSSessionProvider',
    'HelpersProvider',
    function ($routeProvider, $locationProvider, CSTemplateProvider, CSHttpOptionsProvider, CSSessionProvider, HelpersProvider) {

      HelpersProvider.extend('CSCommonHelpers');

      CSTemplateProvider.setPath('/modules/application/views');

      CSHttpOptionsProvider.setDomain('/api');

      CSSessionProvider.setUserService('CSSessionService');

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
