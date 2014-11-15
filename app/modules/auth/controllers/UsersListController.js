define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.controllers' )
  .controller( 'UsersListController', function( $scope, Helpers, dateFilter ) {
    $scope.helpers          = Helpers;
    $scope.welcome          = 'This page lists all of the Users available in your account, you can add as many as you want';
    $scope.actionsTemplate  = '/modules/auth/views/users/table_actions.html';

    $scope.columns = [
      {
        name:       'firstname',
        title:      'First Name',
        filter:     false,
        glyph:      'user'
      },
      {
        name:       'lastname',
        title:      'Last Name',
        filter:     false,
        glyph:      'user'
      },
      {
        name:       'email',
        title:      'Email',
        filter:     false,
        glyph:      'envelope'
      },
      {
        name:       'accessedAt',
        title:      'Last Login',
        filter:     false,
        display:     function( val ) {
          if ( val ) {
            return dateFilter( val, 'short' );
          }
          return 'Never';
        }
      },
      {
        name:       'createdAt',
        title:      'Date Registered',
        filter:     false,
        glyph:      'calendar',
        width:      100,
        display: function( val ) {
          return dateFilter( val, 'short' );
        }
      }
    ];

  });
});
