define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'roles.models' )
  .factory( 'RoleModel', function( $rootScope, Session, ResourceFactory ) {
    var defaultParams = {
      id: '@id'
    };

    $rootScope.$watch( Session.getCurrentUser, function( user ) {
      defaultParams.AccountId = user ? user.Account.id : null;
    });

    return new ResourceFactory( '/account/:AccountId/roles', defaultParams, {} );
  });

});
