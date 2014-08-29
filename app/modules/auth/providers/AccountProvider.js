define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.providers' )
  .provider( 'Account', function() {
    /**
     * @name accountService
     * @type {Object}
     * @propertyOf ngSeed.providers:AccountProvider
     * @description
     * The user service.
     */
    var accountService = null;

    /**
     * @name accountServiceName
     * @type {String}
     * @propertyOf ngSeed.providers:AccountProvider
     * @description
     * The name of the service to $inject.
     */
    var accountServiceName = 'AccountService';

    /**
     * @name handlers
     * @type {Object}
     * @propertyOf ngSeed.providers:AccountProvider
     * @description
     * The handlers object.
     */
    var handlers = {
      registrationSuccess: null,
      registrationFailure: null
    };

    /**
     * @description
     * The actual service.
     */
    return {

      $get: function( $injector, $rootScope, $log ) {
        if( !accountService && accountServiceName ) {
          accountService = $injector.get( accountServiceName );
        }

        if ( !handlers.registrationSuccess ) {
          $log.log( 'AccountProvider: using default registrationSuccess method' );
        }

        if ( !handlers.registrationFailure ) {
          $log.log( 'AccountProvider: using default registrationFailure method' );
        }

        /**
         * @ngdoc function
         * @name handlers.registrationSuccess
         * @propertyOf ngSeed.providers:AccountProvider
         * @description
         */
        handlers.registrationSuccess = handlers.registrationSuccess || function( user ) {
          $rootScope.$broadcast( 'AccountProvider:registrationSuccess', user );
        };

        /**
         * @ngdoc function
         * @name handlers.registrationFailure
         * @propertyOf ngSeed.providers:AccountProvider
         * @description
         */
        handlers.registrationFailure = handlers.registrationFailure || function( response ) {
          $rootScope.$broadcast( 'AccountProvider:registrationFailure', response );
        };


        return {

          /**
           * @name register
           * @ngdoc function
           * @methodOf ngSeed.services:CSSession
           * @param  {Object} credentials the user credentials
           * @return {Promise}             the promise your user service returns on registration.
           */
          register: function( credentials ) {
            return accountService
              .register( credentials )
              .then( function( user ) {
                  handlers.registrationSuccess( user );
                  $rootScope.$broadcast( 'AccountProvider:registrationSuccess', user );
                },
                handlers.registrationFailure
              );
          }

        };

      },

      /**
       * @ngdoc function
       * @methodOf ngSeed.providers:AccountProvider
       * @name setAccountService
       * @param  {String} serviceName the account service name
       */
      setAccountService: function( serviceName ) {
        if ( typeof serviceName !== 'string' ) {
          throw new Error( 'AccountProvider: setAccountService expects a string for the account service' );
        }
        accountServiceName = serviceName;
      },

      /**
       * @ngdoc function
       * @methodOf ngSeed.providers:AccountProvider
       * @name setHandler
       * @param  {String} key - the handler name
       * @param  {Function} foo - the handler function
       * @description
       * Replaces one of the default handlers.
       */
      setHandler: function( key, foo ) {

        if ( !handlers.hasOwnProperty( key ) ) {
          throw new Error( 'AccountProvider: handle name "' + key + '" is not a valid property.' );
        }

        if ( typeof foo !== 'function' ) {
          throw new Error( 'AccountProvider: ' + foo + ' is not a function.' );
        }

        handlers[ key ] = foo;
      }

    };
  });
});