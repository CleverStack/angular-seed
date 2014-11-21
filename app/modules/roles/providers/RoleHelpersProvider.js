define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'roles.providers' )
  .provider( 'RoleHelpers', [ function() {
    var helpers = {}
      , inheritedProviders = [];

    return {
      $get: function( $injector, $rootScope, $timeout, $location ) {
        var Messenger           = $injector.has( 'Messenger' ) ? $injector.get( 'Messenger' ) : $injector.get( '$log' )
          , RoleService         = $injector.has( 'RoleService' ) ? $injector.get( 'RoleService' ) : false
          , PermissionService   = $injector.has( 'PermissionService' ) ? $injector.get( 'PermissionService' ) : false
          , UserService         = $injector.has( 'UserService' ) ? $injector.get( 'UserService' ) : false
          , ModalFactory        = $injector.has( 'ModalFactory' ) ? $injector.get( 'ModalFactory' ) : false
          , Session             = $injector.get( 'Session' );

        if ( inheritedProviders ) {
          inheritedProviders.forEach( function( inheritedProvider ) {
            var provider = $injector.get( inheritedProvider );
            if ( !provider ) {
              throw new Error( 'Unable to inject "' + inheritedProvider + '"' );
            }
            ng.extend( helpers, provider );
          });
        }

        helpers.openRoleModal = function( role ) {
          ModalFactory.open( role, '/modules/roles/views/role/form.html', {
            controller: 'RoleEditController',
            resolve: {
              role: function() {
                if ( typeof role === 'object' ) {
                  role.Users        = role.Users.map( function( user ) {
                    return user.id;
                  });
                  role.Permissions  = role.Permissions.map( function( permission ) {
                    return permission.id;
                  });

                  return role;
                } else if ( role !== false && role !== undefined ) {
                  return RoleService
                    .get( { id: role, _include: 'User' } )
                    .then( function( role ) {

                      role.Users        = role.Users.map( function( user ) {
                        return user.id;
                      });
                      role.Permissions  = role.Permissions.map( function( permission ) {
                        return permission.id;
                      });

                      return role;
                    });
                } else {
                  return { permissions: [], users: [] };
                }
              },

              users: function() {
                return UserService
                  .list()
                  .then( function( users ) {
                    return users;
                  })
                  .catch( function( err ) {
                    Messenger.error( 'Unable to resolve "users" to a value because of (' + err + ')' );
                  });
              },

              permissions: function() {
                return PermissionService
                  .list()
                  .then( function( permissions ) {
                    return permissions;
                  })
                  .catch( function( err ) {
                    Messenger.error( 'Unable to resolve "permissions" to a value because of (' + err + ')' );
                  });
              }
            }
          });
        };

        helpers.openDeleteRoleModal = function( role ) {
          ModalFactory.open( {}, '/modules/cs_modal/views/confirmModal.html', {
            resolve: {
              title: function() {
                return 'Delete the "' + role.name + '" Role?';
              },
              warning: function() {
                return {
                  title:    'Warning:',
                  message:  'If you delete a role that has users their account\'s may no longer work, you will need to assign them each a new role'
                };
              },
              message: function() {
                return 'Are you sure you want to delete this role?';
              },
              confirm: function() {
                return 'Yes, delete this role';
              },
              helpers: function() {
                return helpers;
              }
            },
            methods: {
              submit: function() {
                var $scope = this.$parent;

                role
                .$destroy()
                .then( function() {
                  $scope.next();
                })
                .catch( function( err ) {
                  Messenger.error( 'Unable to delete role because of error (' + err + ')' );
                });
              }
            }
          },
          function() {

          });
        };

        helpers.openPermissionModal = function( permission ) {
          ModalFactory.open( permission, '/modules/roles/views/permission/form.html', {
            controller: 'PermissionEditController',
            resolve: {
              permission: function() {
                if ( typeof permission === 'object' ) {
                  permission.Roles  = permission.Roles.map( function( role ) {
                    return role.id;
                  });
                  
                  return permission;
                } else if ( permission !== false && permission !== undefined ) {
                  return PermissionService
                    .get( { id: permission, _include: 'Role' } )
                    .then( function( permission ) {

                      permission.Roles  = permission.Roles.map( function( role ) {
                        return role.id;
                      });

                      return permission;
                    });
                } else {
                  return { roles: [] };
                }
              },

              roles: function() {
                return RoleService
                  .list()
                  .then( function( roles ) {
                    return roles;
                  })
                  .catch( function( err ) {
                    Messenger.error( 'Unable to resolve "roles" to a value because of (' + err + ')' );
                  });
              }
            }
          });
        };

        helpers.openDeletePermissionModal = function( permission ) {
          ModalFactory.open( {}, '/modules/cs_modal/views/confirmModal.html', {
            resolve: {
              title: function() {
                return 'Delete the "' + permission.action + '" Permission?';
              },
              warning: function() {
                return {
                  title:    'Warning:',
                  message:  'If you delete a permission that has been assigned to a role and subsequently users their account\'s may no longer work.'
                };
              },
              message: function() {
                return 'Are you sure you want to delete this permission?';
              },
              confirm: function() {
                return 'Yes, delete this permission';
              },
              helpers: function() {
                return helpers;
              }
            },
            methods: {
              submit: function() {
                var $scope = this.$parent;

                permission
                .$destroy()
                .then( function() {
                  $scope.next();
                })
                .catch( function( err ) {
                  Messenger.error( 'Unable to delete permission because of error (' + err + ')' );
                });
              }
            }
          },
          function() {

          });
        };

        helpers.ensurePermission = function( permission ) {
          var hasPerm;
          var scope = $rootScope.$new(true);
          var clearWatcher = scope.$watch('user', function(user){
            if(!user){
              return;
            }

            if (user && user.role && user.Role.Permissions) {
              user.Role.Permissions.every(function(perm) {
                if (perm.action === permission) {
                  hasPerm = true;
                  return false;
                }
                return true;
              });
            }

            if (!hasPerm) {
              $timeout(function(){
                Messenger.error('You do not have the correct permissions');
                $location.url('/');
              });
            }
            $timeout(function(){
              clearWatcher();
              scope.$destroy();
            });

          });

          scope.user = Session.getCurrentUser();
        };

        helpers.hasPermission = function( requiredPermission, user ) {
          var currentUser = user || Session.getCurrentUser()
            , role        = currentUser && currentUser.Role
            , hasPerm     = false;

          if (  role && role.Permissions ) {
            role.Permissions.every( function( permission ) {
              if (permission.action === requiredPermission) {
                hasPerm = true;
                return false;
              }

              return true;
            });
          }

          return hasPerm;
        };

        helpers.hasRole = function( requiredRole, user ) {
          var currentUser = user || Session.getCurrentUser();
          return currentUser && currentUser.Role && currentUser.Role.name === requiredRole ? true : false;
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
