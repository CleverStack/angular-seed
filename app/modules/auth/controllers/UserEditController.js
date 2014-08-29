define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.controllers' )
  .controller( 'UserEditController', function( $rootScope, $scope, $modalInstance, Helpers, Messenger, UserService, user, roles, currentUser ) {
    $scope.helpers      = Helpers;

    $scope.user         = user;
    $scope.roles        = roles;
    $scope.currentUser  = currentUser;

    $scope.save = function() {
      var promise;

      if ( this.form && this.form.$invalid ) {
        Messenger.warn( 'Fix form errors and try again.' );
        return;
      }

      if ( !!$scope.user.id ) {
        promise = $scope.user.$save();
      } else {
        promise = UserService.create( $scope.user );
      }

      promise
        .then( function() {
          Messenger.success( 'User ' + $scope.user.fullName + ' (' + $scope.user.email + ') successfully ' + ( !!$scope.user.id ? 'updated.' : 'created.' ) );
          $modalInstance.close( $scope );
        })
        .catch( function( err ) {
          Messenger.error( 'Unable to ' + ( !!$scope.user.id ? 'update' : 'create' ) + ' user ' + $scope.user.fullName + ' (' + $scope.user.email + ') due to error (' + err + ')' );
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss( 'cancel' );
    };
  });
});
