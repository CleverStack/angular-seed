define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'roles.controllers' )
  .controller( 'RoleListController', function( $scope, Helpers ) {
    $scope.welcome          = 'This page lists all of the Roles available in your account, you can add as many as you want';
    $scope.helpers          = Helpers;
    $scope.actionsTemplate  = '/modules/roles/views/role/tableActions.html';

    $scope.columns = [
      // {
      //   name:       'id',
      //   title:      'ID/#',
      //   filter:     true,
      //   filterType: 'text',
      //   glyph:      'barcode',
      //   width:      40,
      // },
      {
        name:       'name',
        title:      'Name',
        filter:     true,
        filterType: 'text',
        glyph:      'user'
      },
      {
        name:       'description',
        title:      'Description',
        filter:     true,
        filterType: 'text',
        glyph:      'list'
      }
    ];

  });
});
