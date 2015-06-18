define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'cs_accounts.controllers' )
  .controller( 'AccountsListController', function( $scope, Helpers, dateFilter ) {
    $scope.helpers          = Helpers;
    $scope.welcome          = 'This page lists all of the accounts in the system.';
    $scope.actionsTemplate  = '/modules/cs_accounts/views/partials/tableActions.html';

    $scope.columns = [
      {
        name       : 'id',
        title      : 'ID',
        glyph      : 'slack',
        filter     : true,
        filterType : 'text',
        sortable   : true,
        visible    : true
      },
      {
        name:       'name',
        title:      'Name',
        filter:     true,
        filterType: 'text',
        glyph:      'user',
        visible:    true
      },
      {
        name:       'subDomain',
        title:      'Sub Domain',
        filter:     true,
        filterType: 'text',
        glyph:      'user',
        visible:    true
      },
      {
        name:       'email',
        title:      'Email',
        filter:     true,
        filterType: 'text',
        glyph:      'envelope',
        visible:    true
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
      },
      {
        name:       'updatedAt',
        title:      'Date Updated',
        filter:     true,
        glyph:      'calendar',
        filterType: 'text',
        visible:    true,
        display:     function( val ) {
          if ( val ) {
            return dateFilter( val, 'short' );
          }
          return 'Never';
        }
      }
    ];
  });
});
