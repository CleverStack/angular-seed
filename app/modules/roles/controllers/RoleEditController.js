define( [ 'angular', 'underscore', '../module' ], function( ng, underscore ) {
  'use strict';

  ng
  .module( 'roles.controllers' )
  .controller( 'RoleEditController', function( $rootScope, $scope, $injector, $modalInstance, Helpers, RoleService, role, users, permissions ) {
    var Messenger = $injector.has( 'Messenger' ) ? $injector.get( 'Messenger' ) : $injector.get( '$log' );

    $scope.helpers      = Helpers;
    $scope.role         = role;
    $scope.users        = users;
    $scope.permissions  = permissions;

    $scope.save         = function() {
      var promise;

      if ( this.form && this.form.$invalid ) {
        return Messenger.warn( 'Please fix the form errors highlighted red and try again.' );
      }

      $scope.role.Permissions = underscore.map($scope.role.Permissions, function(permission) {
        return parseInt(permission, 10);
      });

      $scope.role.Users = underscore.map($scope.role.Users, function(user) {
        return parseInt(user, 10);
      });

      if ( !!$scope.role.id ) {
        promise = $scope.role.$save();
      } else {
        promise = RoleService.create( $scope.role );
      }

      promise
        .then( function() {
          $rootScope.$broadcast( 'table:reload' );
          Messenger.success( 'Role ' + $scope.role.name + ' successfully ' + ( !!$scope.role.id ? 'updated.' : 'created.' ) );
          $modalInstance.close( $scope );
        })
        .catch( function( err ) {
          Messenger.error( 'Unable to ' + ( !!$scope.role.id ? 'update' : 'create' ) + ' role ' + $scope.role.name + ' due to error (' + (err.message || err) + ')' );
        });
    };

    $scope.cancel       = function () {
      if ( $scope.role && typeof $scope.role.$get === 'function' ) {
        $scope.role.$get();
      }
      $modalInstance.dismiss( 'cancel' );
    };
  });
});
