define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.controllers' )
  .controller( 'UserEditController', function( $rootScope, $scope, $modalInstance, $injector, Helpers, UserService, user, roles, currentUser ) {
    var Messenger = $injector.has( 'Messenger' ) ? $injector.get( 'Messenger' ) : $injector.get( '$log' );

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
          $rootScope.$broadcast( 'table:reload' );
          Messenger.success( 'User ' + $scope.user.fullName + ' (' + $scope.user.email + ') successfully ' + ( !!$scope.user.id ? 'updated.' : 'created.' ) );
          $modalInstance.close( $scope );
        })
        .catch( function( err ) {
          Messenger.error( 'Unable to ' + ( !!$scope.user.id ? 'update' : 'create' ) + ' user ' + $scope.user.fullName + ' (' + $scope.user.email + ') due to error (' + err + ')' );
        });
    };

    $scope.cancel = function () {
      if ( $scope.user && typeof $scope.user.$get === 'function' ) {
        $scope.user.$get();
      }
      $modalInstance.dismiss( 'cancel' );
    };
  });
});
