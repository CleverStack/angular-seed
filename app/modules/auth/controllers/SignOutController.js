define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.controllers' )
  .controller( 'SignOutController', function( $injector, $log, Session ) {
    $log.log( 'SignOutController: signOut()' );
    Session.signOut();
  });
});