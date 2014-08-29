define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'roles.controllers' )
  .controller( 'RoleEditController', function( $scope, Helpers, Messenger, RoleService, $modalInstance, role, users, permissions ) {
    $scope.helpers      = Helpers;

    $scope.role         = role;
    $scope.users        = users;
    $scope.permissions  = permissions;

    $scope.save         = function() {
      var promise;

      if ( this.form && this.form.$invalid ) {
        Messenger.warn( 'Fix form errors and try again.' );
        return;
      }

      if ( !!$scope.role.id ) {
        promise = $scope.role.$save();
      } else {
        promise = RoleService.create( $scope.role );
      }

      promise
        .then( function() {
          Messenger.success( 'Role ' + $scope.role.name + ' successfully ' + ( !!$scope.role.id ? 'updated.' : 'created.' ) );
          $modalInstance.close( $scope );
        })
        .catch( function( err ) {
          Messenger.error( 'Unable to ' + ( !!$scope.role.id ? 'update' : 'create' ) + ' role ' + $scope.role.name + ' due to error (' + err + ')' );
        });
    };

    $scope.cancel       = function () {
      $modalInstance.dismiss( 'cancel' );
    };
  });
});
