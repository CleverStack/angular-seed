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
    function ($routeProvider, $locationProvider, CSTemplate) {

      $locationProvider.html5Mode(true);

      $routeProvider
        // .when('/', {
        //   template: 'HOME!',
        //   // templateUrl: CSTemplate.view('home'),
        //   controller: 'CSHome',
        //   public: true
        // })
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
