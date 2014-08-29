define( [ 'angular', 'underscore', '../module' ], function( angular, _ ) {
  'use strict';

  angular
    .module( 'cs_common.directives' )
    .directive( 'warnUnsavedChanges', [
      '$window',
      function( $window ) {
        return function( $scope, $element, $attrs ) {
          var master, cancelWatch;

          function applyWatch( model ) {
            master = angular.copy( model );
            attachDirtyFormWarningHandler( $scope );
            cancelWatch();
          }

          cancelWatch = $scope.$watch( $attrs.warnUnsavedChanges, function( model ) {
            if ( model && _( model ).has( '$resolved' ) ) {
              if ( model.$resolved === true ) {
                applyWatch( model );
              }
            } else {
              applyWatch( model );
            }
          }, true);

          function attachDirtyFormWarningHandler( $scope ){

            function dirtyFormWarningHandler( event ){
              if ( isDirty() ){
                if ( !$window.confirm( 'There are unsaved changes on this form. Are you sure you want to leave this page?' ) ) {
                  event.preventDefault();
                }
              }
            }

            function isDirty() {
              return $scope.form.$dirty && !angular.equals( master, $scope[ $attrs.warnUnsavedChanges ] );
            }

            $scope.$on( '$locationChangeStart', dirtyFormWarningHandler );

            // function showWarning() {
            //   return 'There\'s some unsaved changes.';
            // }

            // var attached;
            // $scope.$watch(isDirty, function(dirty) {
            //   if(dirty && !attached) {
            //     angular.element($window).on('beforeunload', showWarning);
            //     attached = true;
            //   } else {
            //     angular.element($window).off('beforeunload', showWarning);
            //     attached = false;
            //   }
            // });

            $scope.$watch( 'processing', function( processing, previousValue ) {
              if( processing === false && previousValue === true ) {
                master = angular.copy( $scope[ $attrs.warnUnsavedChanges ] );
              }
            });

          }

        };
      }
    ]

  );

});