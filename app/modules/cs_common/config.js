define(['angular', './module'], function (ng){
  'use strict';

  ng.module('cs_common')
  .config([
    '$routeProvider',
    'CSTemplateProvider',
    function ($routeProvider, CSTemplate) {

      $routeProvider
        .when('/', {
          template: 'HOME',
          // templateUrl: CSTemplate.view('home'),
          controller: 'CSHome',
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

});
