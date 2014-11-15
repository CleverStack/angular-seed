define( [ 'angular', 'underscore', '../module' ], function( ng, _ ) {
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
    var accountService      = null;

    /**
     * @name accountServiceName
     * @type {String}
     * @propertyOf ngSeed.providers:AccountProvider
     * @description
     * The name of the service to $inject.
     */
    var accountServiceName  = 'AccountService';

    var selectedAccount     = null;

    var sessionProvider     = null;

    var helpers             = null;

    function refreshAccounts() {
      var currentUser;

      if ( !!sessionProvider && ( currentUser = sessionProvider.getCurrentUser() ) !== null && helpers.hasPermission( 'Account.list', currentUser ) ) {
        accountService.list().then( function() {
          if ( selectedAccount === null ) {
            selectedAccount  = accountService.data[ 0 ];
          } else {
            selectedAccount  = _.findWhere( accountService.data, { id: selectedAccount.id } );
          }
        });
      }
    }

    /**
     * @name handlers
     * @type {Object}
     * @propertyOf ngSeed.providers:AccountProvider
     * @description
     * The handlers object.
     */
    var handlers            = {
      registrationSuccess: null,
      registrationFailure: null
    };

    /**
     * @description
     * The actual service.
     */
    return {

      $get: function( $injector, $rootScope, $log, Session, Helpers ) {
        if ( !sessionProvider ) {
          sessionProvider = Session;
        }

        if ( !helpers ) {
          helpers = Helpers;
        }

        if( !accountService && accountServiceName ) {
          accountService = $injector.get( accountServiceName );

          $rootScope.$on( 'accounts:refresh', function( event, account ) {
            if ( account ) {
              selectedAccount = account;
            }
            refreshAccounts();
          });

          // After the user has logged in refresh the list of available accounts
          $rootScope.$on( 'SessionProvider:signInSuccess', function() {
            refreshAccounts();
          });

          $rootScope.$watch( sessionProvider.getCurrentUser, function() {
            refreshAccounts();
          });

          refreshAccounts();
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
          },

          refreshAccounts: refreshAccounts,

          getAccounts: function() {
            return accountService.data;
          },

          getSelectedAccount: function() {
            return selectedAccount;
          },

          selectAccount: function( account ) {
            selectedAccount = account;
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