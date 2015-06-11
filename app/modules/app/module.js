define( [ 'angular' ], function( ng ) {
  'use strict';

  ng.module( 'app.controllers', [] );

  var module = ng.module( 'app', [
    'cs_common',
    'cs_modal',
    'auth',
    'cs_accounts',
    'roles',
    'app.controllers'
  ]);

  module.config( function( $routeProvider, $locationProvider, TemplateProvider, HttpOptionsProvider, SessionProvider, NavbarProvider ) {

    // Turn on HTML5 PushState URL's
    $locationProvider.html5Mode( true );

    // Set the service that will be used for Sessions
    SessionProvider.setSessionService( 'SessionService' );

    // Set the domain of the API
    switch( window.location.host.match( '([^:]+):?(.*)' )[ 1 ] ) {

    case 'localhost':
    case '127.0.0.1':
    case 'local':
    default:
      HttpOptionsProvider.setDomain( 'http://localhost:8080' );
      break;
    }

    NavbarProvider.extend({
      app: [
        {
          label:          'Home',
          href:           '/',
          class:          'fa-2x fa-home',
          order:          10,
          display: function() {
            return true;
          }
        },
        {
          label:          'Add New...',
          class:          'fa-2x fa-plus-circle',
          requiresSignIn: true,
          order:          20,
          subMenu: [
            {
              label:          'User',
              href:           '/user/new',
              class:          'fa-user',
              requiresSignIn: true,
              order:          1,
              click:          function( $scope, $event ) {
                $scope.helpers.openUserModal( false );
                $event.preventDefault();
              }
            },
            {
              label:          'Role',
              href:           '/role/new',
              class:          'fa-group',
              requiresSignIn: true,
              order:          2,
              click:          function( $scope, $event ) {
                $scope.helpers.openRoleModal( false );
                $event.preventDefault();
              }
            },
            {
              label:          'Permission',
              href:           '/permission/new',
              class:          'fa-legal',
              requiresSignIn: true,
              order:          3,
              click:          function( $scope, $event ) {
                $scope.helpers.openPermissionModal( false );
                $event.preventDefault();
              }
            }
          ]
        },
        {
          label:          'Help',
          href:           '/help',
          class:          'fa-2x fa-question-circle',
          order:          40,
          display: function() {
            return true;
          }
        }
      ]
    });

    $routeProvider
      .when( '/', {
        templateUrl: TemplateProvider.view( 'app', 'home' ),
        controller: 'HomeController',
        public: true
      })
      .when( '/help', {
        templateUrl: TemplateProvider.view( 'app', 'help' ),
        controller: 'HelpController',
        public: true
      });

  });

  return module;
});
