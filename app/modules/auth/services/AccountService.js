define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.services' )
  .factory( 'AccountService', function( AccountModel, UserModel ) {
    var AccountService = {
      model: AccountModel,

      data    : null,

      list    : function( findOptions ) {
        return AccountModel.list( findOptions ).$promise.then( function( accounts ) {
          AccountService.data = accounts;
          return AccountService.data;
        });
      },

      get: function( findOptions ) {
        return AccountModel.get( findOptions ).$promise;
      },

      create: function( data ) {
        return AccountModel.create( data ).$promise;
      },

      confirm: function( data ) {
        return UserModel.confirm( data ).$promise;
      }
    };

    return AccountService;
  });
});
