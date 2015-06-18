define( [ 'angular', 'underscore', '../module' ], function( ng, underscore ) {
  'use strict';

  ng
  .module( 'roles.controllers' )
  .controller( 'PermissionEditController', function( $rootScope, $scope, $injector, $modalInstance, Helpers, PermissionService, permission, roles ) {
    var Messenger = $injector.has( 'Messenger' ) ? $injector.get( 'Messenger' ) : $injector.get( '$log' );

    $scope.helpers      = Helpers;
    $scope.roles        = roles;
    $scope.permission   = permission;


    $scope.save         = function() {
      var promise;

      if ( this.form && this.form.$invalid ) {
        return Messenger.warn( 'Please fix the form errors highlighted red and try again.' );
      }

      $scope.permission.Roles = underscore.map($scope.permission.Roles, function(role) {
        return parseInt(role, 10);
      });

      if ( !!$scope.permission.id ) {
        promise = $scope.permission.$save();
      } else {
        promise = PermissionService.create( $scope.permission );
      }

      promise
        .then( function() {
          $rootScope.$broadcast( 'table:reload' );
          Messenger.success( 'Permission ' + $scope.permission.action + ' successfully ' + ( !!$scope.permission.id ? 'updated.' : 'created.' ) );
          $modalInstance.close( $scope );
        })
        .catch( function( err ) {
          Messenger.error( 'Unable to ' + ( !!$scope.permission.id ? 'update' : 'create' ) + ' permission ' + $scope.permission.action + ' due to error (' + (err.message || err) + ')' );
        });
    };

    $scope.cancel       = function () {
      if ( $scope.permission && typeof $scope.permission.$get === 'function' ) {
        $scope.permission.$get();
      }
      $modalInstance.dismiss( 'cancel' );
    };
  });
});
