define(['angular'], function (ng) {
  'use strict';

  console.log('cs_common');

  ng.module('cs_common.providers', []);
  ng.module('cs_common.controllers', []);
  ng.module('cs_common.services', []);

  var module = ng.module('cs_common', [
    'ngResource',
    'http-auth-interceptor',
    'cs_common.providers',
    'cs_common.controllers',
    'cs_common.services'
  ]);

  module.config([
    '$routeProvider',
    'CSTemplateProvider',
    function ($routeProvider, CSTemplate) {

      $routeProvider
        .when('/', {
          template: 'HOME',
          // templateUrl: CSTemplate.view('home'),
          controller: 'CSHomeController',
          public: true
        })
        .when('/error', {
          templateUrl: CSTemplate.partial('error'),
          public: true
        })
        .otherwise({
          redirectTo: '/'
        });

    }

  ]);

  return module;

});
