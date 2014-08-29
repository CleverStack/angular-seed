define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'roles.models' )
  .factory( 'RoleModel', function( $rootScope, Session, ResourceFactory ) {
    var defaultParams = {
      id: '@id'
    };

    $rootScope.$watch( Session.getCurrentUser, function( user ) {
      defaultParams.accountId = user ? user.AccountId : null;
    });

    return new ResourceFactory( '/account/:accountId/roles', defaultParams, {} );
  });

});
