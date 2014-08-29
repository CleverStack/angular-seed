define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.services' )
  .factory( 'AccountService', function( AccountModel ) {
    return {
      model: AccountModel,

      list: function( findOptions ) {
        return AccountModel.list( findOptions ).$promise;
      },

      get: function( findOptions ) {
        return AccountModel.get( findOptions ).$promise;
      },

      create: function( data ) {
        return AccountModel.create( data ).$promise;
      }
    };
  });
});
