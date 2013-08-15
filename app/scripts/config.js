define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.config(
    ['$locationProvider', '$authProvider', '$httpOptionsProvider'
    ,'$templatesProvider', '$httpProvider'
    ,function ($locationProvider, $authProvider, $httpOptionsProvider, $templatesProvider, $httpProvider) {
    
    // $httpOptionsProvider can be configured, refer to its documentation
    // $httpOptionsProvider.setDomain('http://localhost:8080');

    // $authProvider can be configured, refer to its documentation
    // $authProvider.setUserService('UserService');
    
    // $templatesProvider can be configured, refer to its documentation
    // $templatesProvider.setPath('/templates/');
    
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
  app.run(['$auth', function ($auth) {
  }]);

});