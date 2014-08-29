define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'roles.services' )
  .factory( 'RoleService', function( RoleModel ) {
    return {
      model: RoleModel,

      list: function( findOptions ) {
        return RoleModel.list( findOptions ).$promise;
      },

      get: function( findOptions ) {
        return RoleModel.get( findOptions ).$promise;
      },

      create: function( data ) {
        return RoleModel.create( data ).$promise;
      }
    };
  });

});
