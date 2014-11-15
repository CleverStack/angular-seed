define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'cs_common.providers' )
  .provider( 'Helpers', [
    function  Helpers() {

      var helpers = {};
      var inheritedProviders = [];

      /**
       * @description
       * The actual service.
       */
      return {
        $get: [ '$injector', '$location', '$log',
          function( $injector, $location, $log ) {

            if ( inheritedProviders ) {
              inheritedProviders.forEach( function( inheritedProvider ) {
                var provider = $injector.get( inheritedProvider );
                if ( !provider ) {
                  throw new Error( 'Unable to inject "' + inheritedProvider + '"' );
                }
                ng.extend( helpers, provider );
              });
            }

            if ( $injector.has( 'ModalFactory' ) ) {
              helpers.modal = $injector.get( 'ModalFactory' ).open;
            }

            helpers.hasError = function( $scope, fieldName, validation, validateOnSubmit ) {
              if ( !$scope.form ) {
                throw new Error( 'Expected $scope.form' );
              }
              var field = $scope.form[ fieldName ];
              if ( !field ) {
                throw new Error('Expected $scope.form to have a field \'' + fieldName + '\'');
              }

              if ( validateOnSubmit && !$scope.submitted ) {
                return false;
              }

              if ( validation ) {
                return ( field.$dirty && field.$error[ validation ] ) || ( $scope.submitted && field.$error[ validation ] );
              }
              return !!( ( field.$dirty && field.$invalid ) || ( $scope.submitted && field.$invalid ) );
            };

            helpers.isActive = function( path ) {
              var paths     = path instanceof Array ? path : [ path ]
                , isActive  = false;

              paths.every( function( _path ) {
                var regex = new RegExp( _path, 'ig' );
                if ( regex.test( $location.path() ) ) {
                  isActive = true;
                  return false;
                }
                return true;
              });

              return isActive;
            };

            helpers.redirect = function( path, $event ) {
              if ( $event ) {
                $event.stopPropagation();
                $event.preventDefault();
              }

              if ( !path ) {
                return $log.error( 'Path not provided' );
              }

              $location.url( path );
              return false;
            };

            return helpers;

          }
        ],

        /**
         * @ngdoc function
         * @methodOf ngSeed.providers:Helpers
         * @name setAccountService
         * @param  {String} serviceName the account service name
         */
        extend: function( providerName ) {
          if ( typeof providerName !== 'string' ) {
            throw new Error( 'Helpers: extend method expects a string (name of the helpers provider)' );
          }
          inheritedProviders.push( providerName );
        }

      };

    }

  ]);

});
