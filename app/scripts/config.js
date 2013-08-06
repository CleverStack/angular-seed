define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.config(
    ['$locationProvider', '$httpProvider', '$authProvider',
    function ($locationProvider, $httpProvider, $authProvider) {
    
    $httpProvider.defaults.withCredentials = true;
    $locationProvider.html5Mode( true );
  }]);

  // Initialize $auth
  // app.run(['$auth', '$resourceFactory',
  // function ($auth, $resourceFactory) {
    // You can register your resources here
    // $resourceFactory('Resource#1')
    // $resourceFactory('Resource#2')
    // After this, they will be available to be injected
    // in your controllers like regular services.
  // }]);
  // 
  app.run(['$auth', '$debug', function ($auth, $debug) {
  }]);

});