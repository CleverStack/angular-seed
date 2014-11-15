define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.controllers' )
  .controller( 'AccountChooserController', function( $scope, $rootScope, Helpers, Account, Session ) {
    
    $scope.helpers      = Helpers;

    $scope.accounts     = null;
    $scope.account      = null;
    $scope.currentUser  = null;

    $scope.$watch( Account.getAccounts, function( accounts ) {
      $scope.accounts   = accounts;
    });

    $scope.$watch( Account.getSelectedAccount, function( account ) {
      $scope.account    = account;
    });

    $scope.$watch( Session.getCurrentUser, function( user ) {
      $scope.currentUser = user;
    });

  });

});
