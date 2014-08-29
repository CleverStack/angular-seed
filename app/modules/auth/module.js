define( [ 'angular' ], function( ng ) {
  'use strict';

  ng.module( 'auth.providers', [] );
  ng.module( 'auth.controllers', [] );
  ng.module( 'auth.services', [] );
  ng.module( 'auth.filters', [] );
  ng.module( 'auth.models', [] );

  var module = ng.module( 'auth', [
    'cs_common',
    'auth.providers',
    'auth.filters',
    'auth.controllers',
    'auth.models',
    'auth.services'
  ]);

  module.config( function( $routeProvider, $injector, TemplateProvider, SessionProvider, HelpersProvider, NavbarProvider ) {

    SessionProvider.setSessionService( 'SessionService' );
    HelpersProvider.extend( 'AuthHelpers' );

    NavbarProvider.extend({
      right: [
        {
          label:          'Sign Up',
          href:           '/signUp',
          class:          'fa-list-alt',
          requiresSignIn: false,
          order:          1,
          display:        function( $scope ) {
            return !$scope.currentUser;
          }
        },
        {
          label: 'Settings',
          href: '',
          class: 'fa-cogs',
          requiresSignIn: true,
          order: 1,
          subMenu: [
            {
              label:          'Account',
              href:           '/settings/account',
              class:          'fa-institution',
              requiresSignIn: true,
              order:          3
            },
            {
              label:          'Users',
              href:           '/settings/users',
              class:          'fa-user',
              requiresSignIn: true,
              order:          4
            }
          ]
        },
        {
          label:          'My Account',
          click:          function( $scope, $event ) {
            $scope.helpers.openUserModal( $scope.currentUser, $scope.currentUser, true );
            $event.preventDefault();
          },
          class:          'fa-user',
          order:          2,
          display:        function( $scope ) {
            return !!$scope.currentUser;
          }
        },
        {
          label:          'Sign In',
          href:           '/signIn',
          class:          'fa-sign-in',
          order:          2,
          display:        function( $scope ) {
            return !$scope.currentUser;
          }
        },
        {
          label:          'Sign Out',
          href:           '/signOut',
          class:          'fa-sign-out',
          order:          3,
          display:        function( $scope ) {
            return !!$scope.currentUser;
          }
        }
      ]
    });

    $routeProvider
      .when( '/signUp', {
        templateUrl: TemplateProvider.view( 'auth', 'signUp' ),
        controller: 'SignUpController',
        public: true
      })
      .when('/registration_confirm/:accountId/:token', {
        templateUrl: TemplateProvider.view( 'auth', 'registration_confirm' ),
        controller: 'RegistrationConfirm',
        public: true
      })
      .when( '/signIn', {
        templateUrl: TemplateProvider.view( 'auth', 'signIn' ),
        controller: 'SignInController',
        public: true
      })
      .when( '/signOut', {
        templateUrl: TemplateProvider.view( 'auth', 'partials/signOut' ),
        controller: 'SignOutController',
        template: ' ',
        public: true
      })
      .when('/password_reset_request', {
        templateUrl: TemplateProvider.view( 'auth', 'password_reset_request' ),
        controller: 'PasswordResetRequestController',
        public: true
      })
      .when('/password_reset_submit', {
        templateUrl: TemplateProvider.view( 'auth', 'password_reset_submit' ),
        controller: 'PasswordResetSubmitController',
        public: true
      })
      .when( '/settings/users', {
        templateUrl: TemplateProvider.view( 'auth', 'users/list' ),
        controller: 'UsersListController',
        public: false
      })
      .when('/account_confirm', {
        templateUrl: TemplateProvider.view( 'auth', 'account_confirm' ),
        controller: 'ActivationConfirm',
        public: true
      });

  });

  return module;
});
