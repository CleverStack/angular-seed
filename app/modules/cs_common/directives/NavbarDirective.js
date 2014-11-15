define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  /**
   * @ngdoc directive
   * @name ngSeed.directives:navbar
   * @description
   * Sets the current navbar option in focus.
   */
  ng
  .module( 'cs_common.directives' )
  .directive( 'navbar', function() {
    return {
      restrict:     'E',
      replace:      true,
      transclude:   true,
      templateUrl:  'modules/cs_common/views/navbar.html',
      scope: {
        heading: '@'
      },
      controller: 'NavbarController',
      link: function( $scope ) {
        //show if the item requires signIn and the user is logged in
        $scope.showItem = function( item ) {
          if ( item.requiresPermission ) {
            if ( !$scope.helpers.hasPermission( item.requiresPermission, $scope.currentUser ) ) {
              return false;
            }
          }

          if ( item.display && typeof item.display === 'function' ) {
            return item.display( $scope );
          } else {
            return ng.isDefined( $scope.currentUser ) && ng.isDefined( $scope.currentUser.id ) === item.requiresSignIn;
          }
        };

        $scope.classHandler = function( item ) {
          var css = '';
          if ( item.class ) {
            css = 'fa fa-fw ' + item.class;
          } else if ( item.glyph ) {
            css = 'glyphicon glyphicon-' + item.glyph;
          }
          return css;
        };

      }
    };
  });
});
