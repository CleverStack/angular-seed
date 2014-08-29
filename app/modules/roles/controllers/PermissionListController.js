define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'roles.controllers' )
  .controller( 'PermissionListController', function( $scope, Helpers ) {
    $scope.welcome          = 'Viewing all Permissions available in your account, you can define your own custom ones by clicking the "Add Permission" Button.';
    $scope.helpers          = Helpers;
    $scope.actionsTemplate  = '/modules/roles/views/permission/tableActions.html';

    $scope.sorting          = { action: 'asc' };

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
        name:       'action',
        title:      'Action Name',
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
