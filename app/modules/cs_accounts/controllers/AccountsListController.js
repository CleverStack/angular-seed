define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'cs_accounts.controllers' )
  .controller( 'AccountsListController', function( $scope, Helpers, dateFilter ) {
    $scope.helpers          = Helpers;
    $scope.welcome          = 'This page lists all of the Users available in your account, you can add as many as you want';
    $scope.actionsTemplate  = '/modules/cs_accounts/views/partials/table_actions.html';

    $scope.columns = [
      {
        name:       'name',
        title:      'Name',
        filter:     false,
        glyph:      'user',
        visible:    true
      },
      {
        name:       'lastName',
        title:      'Last Name',
        // filter:     true,
        // filterType: 'text',
        glyph:      'user',
        visible:    true
      },
      {
        name:       'email',
        title:      'Email',
        filter:     false,
        glyph:      'envelope',
        visible:    true
      },
      {
        name:       'accessedAt',
        title:      'Last Login',
        filter:     false,
        visible:    true,
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
        visible:    true,
        display: function( val ) {
          return dateFilter( val, 'short' );
        }
      }
    ];

  });
});
