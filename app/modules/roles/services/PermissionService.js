define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'roles.services' )
  .factory( 'PermissionService', function( PermissionModel ) {
    return {
      model: PermissionModel,

      list: function( findOptions ) {
        return PermissionModel.list( findOptions ).$promise;
      },

      get: function( findOptions ) {
        return PermissionModel.get( findOptions ).$promise;
      },

      create: function( data ) {
        return PermissionModel.create( data ).$promise;
      }
    };
  });

});
