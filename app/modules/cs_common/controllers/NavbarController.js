define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'cs_common.controllers' )
  .controller( 'NavbarController', function( $rootScope, $scope, Session, Helpers, Navbar ) {
      $scope.helpers = Helpers;

      $scope.$watch( Session.getCurrentUser, function( user ) {
        $scope.currentUser = user || false;
      });

      $scope.$watch( Navbar.getNavbar, function( navbarItems ) {
        $scope.navbarItems = navbarItems || false;
      });
    }
  );
});
