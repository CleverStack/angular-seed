define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'roles.controllers' )
  .controller( 'RoleListController', function( $scope, Helpers ) {
    $scope.welcome          = 'This page lists all of the Roles available in your account, you can add as many as you want';
    $scope.helpers          = Helpers;
    $scope.sorting = {
      id: 'asc'
    };
    $scope.actionsTemplate  = '/modules/roles/views/role/tableActions.html';

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
        name       : 'name',
        title      : 'Name',
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

  });
});
