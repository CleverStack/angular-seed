define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.services' )
  .factory( 'UserService', function( UserModel ) {
    return {
      model: UserModel,

      list: function( findOptions ) {
        return UserModel.list( findOptions ).$promise;
      },

      get: function( findOptions ) {
        return UserModel.get( findOptions ).$promise;
      },

      create: function( data ) {
        return UserModel.create( data ).$promise;
      },

      confirm: function( data ) {
        return UserModel.confirm( data ).$promise;
      }
    };
  });

});
