define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'roles.controllers' )
  .controller( 'PermissionListController', function( $scope, Helpers ) {
    $scope.welcome = 'Viewing all Permissions available in your account, you can define your own custom ones by clicking the "Add Permission" Button.';
    $scope.helpers = Helpers;
    $scope.sorting = {
      action: 'asc'
    };
    $scope.columns = [
      {
        name       : 'id',
        title      : 'ID',
        glyph      : 'hash',
        filter     : true,
        filterType : 'text',
        sortable   : true,
        visible    : true
      },
      {
        name       : 'action',
        title      : 'Action Name',
        glyph      : 'user',
        filter     : true,
        filterType : 'text',
        sortable   : true,
        visible    : true
      },
      {
        name       : 'description',
        title      : 'Description',
        glyph      : 'list',
        filter     : true,
        filterType : 'text',
        sortable   : true,
        visible    : true
      }
    ];
    $scope.actionsTemplate = '/modules/roles/views/permission/tableActions.html';
  });
});
