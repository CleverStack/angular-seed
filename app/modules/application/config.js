define(['angular', './bootstrap'], function (ng){
  'use strict';

  ng.module('app')
  .config([
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

});
