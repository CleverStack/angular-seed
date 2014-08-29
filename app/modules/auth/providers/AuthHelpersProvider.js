define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.providers' )
  .provider( 'AuthHelpers', [ function() {
    var helpers = {};
    var inheritedProviders = [];

    return {
      $get: function( $injector, UserService ) {
        var RoleService   = $injector.has( 'RoleService' ) ? $injector.get( 'RoleService' ) : false
          , ModalFactory  = $injector.has( 'ModalFactory' ) ? $injector.get( 'ModalFactory' ) : false;

        if ( inheritedProviders ) {
          inheritedProviders.forEach( function( inheritedProvider ) {
            var provider = $injector.get( inheritedProvider );
            if ( !provider ) {
              throw new Error( 'Unable to inject "' + inheritedProvider + '"' );
            }
            ng.extend( helpers, provider );
          });
        }

        helpers.openUserModal = function( user, currentUser ) {
          ModalFactory.open( user, '/modules/auth/views/users/form.html', {
            controller: 'UserEditController',
            resolve: {
              user: function() {
                if ( typeof user === 'object' ) {
                  return user;
                } else if ( user !== false && user !== undefined ) {
                  return UserService
                    .get( { id: user } )
                    .then( function( user ) {
                      return user;
                    });
                } else {
                  return {};
                }
              },
              currentUser: function() {
                return currentUser;
              },
              roles: function() {
                if ( !!RoleService ) {
                  return RoleService
                    .list()
                    .then(function( roles ) {
                      return roles;
                    });
                } else {
                  return [];
                }
              }
            }
          });
        };

        return helpers;
      },

      /**
       * @ngdoc function
       * @methodOf ngSeed.providers:CSAccountProvider
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

  }]);
});
