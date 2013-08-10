define(['angular', 'app'], function (angular, app) {
  
  'use strict';

  app.config(
    ['$routeProvider', '$templatesProvider'
    , function ($routeProvider, $templatesProvider) {

    var t = $templatesProvider;

    $routeProvider
      .when('/', {
        templateUrl: t.view('home'),
        controller: 'Home',
        public: true
      })
      .when('/users', {
        templateUrl: t.view('home'),
        controller: 'Users'
      })
      .when('/login', {
        templateUrl: t.view('login'),
        controller: 'Login',
        public: true
      })
      .when('/error', {
        templateUrl: t.partial('error'),
        public: true
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

});