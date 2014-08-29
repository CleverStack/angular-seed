define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'roles.controllers' )
  .controller( 'PermissionEditController', function( $scope, Helpers, Messenger, PermissionService, $modalInstance, permission, roles ) {
    $scope.helpers      = Helpers;

    $scope.permission   = permission;
    $scope.roles        = roles;

    $scope.save         = function() {
      var promise;

      if ( this.form && this.form.$invalid ) {
        Messenger.warn( 'Fix form errors and try again.' );
        return;
      }

      if ( !!$scope.permission.id ) {
        promise = $scope.permission.$save();
      } else {
        promise = PermissionService.create( $scope.permission );
      }

      promise
        .then( function() {
          Messenger.success( 'Permission ' + $scope.permission.action + ' successfully ' + ( !!$scope.permission.id ? 'updated.' : 'created.' ) );
          $modalInstance.close( $scope );
        })
        .catch( function( err ) {
          Messenger.error( 'Unable to ' + ( !!$scope.permission.id ? 'update' : 'create' ) + ' permission ' + $scope.permission.action + ' due to error (' + err + ')' );
        });
    };

    $scope.cancel       = function () {
      $modalInstance.dismiss( 'cancel' );
    };
  });
});
