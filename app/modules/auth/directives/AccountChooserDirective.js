define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.directives' )
  .directive( 'accountchooser', function( Template, $injector ) {

    return {
      restrict      : 'E',
      transclude    : true,
      scope : {
        heading     : '@'
      },
      replace       : true,
      templateUrl:  Template.partial( 'auth', 'account', 'chooser' ),
      controller:   'AccountChooserController',
      link: function( $scope ) {

        $scope.selectAccount = function( account ) {
          $injector.get( 'Account' ).selectAccount( account );
        };

      }
    };

  });

});
