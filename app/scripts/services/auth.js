define(['angular', 'app'], function (angular, app) {
  'use strict';

  /**
   * @ngdoc service
   * @name $auth
   * @description
   * Dead-easy auth checking.
   * 
   * Please note that custom login requiring logic, on-location-change auth
   * checking, and default login success behaviour can be configured
   * using the authProvider on a config block.
   *
   * ### Configuring $authProvider:
   * This is the default value, feel free to change it to something else if your app requires it:
   *
   * ```js
   * $authProvider.setUserService('UserService');
   * 
   * $authProvider.setHandler('handleLoginStart', function (redirect) {
   *   $('#myLoginModal').open();
   * });
   * 
   * $authProvider.setHandler('handleLoginSuccess', function () {
   *   $('#myLoginModal').close();
   * });
   * ```
   *
   * ### Securing Routes:
   * Add a `public: false` property or a `public: true` property to your routes. In fact,
   * any falsy value will end up requiring login. For instance:
   *
   * ```js
   * $routeProvider
   *  .when('/', {
   *    templateUrl: view('home'),
   *    controller: 'HomeCtrl',
   *    public: true
   *  })
   *  .when('/users', {
   *    templateUrl: view('users'),
   *    controller: 'UserCtrl',
   *  })
   *  .when('/error', {
   *    templateUrl: partial('error'),
   *    public: true
   *  })
   *  .otherwise({
   *    redirectTo: '/'
   *  });
   * ```
   *
   * This will give you a public home and error routes. If you try to access `/users`, you will
   * immediately be prompted for authentication.
   */
   
  angular
  .module('app.services')
  .provider('$auth', function () {
      /**
       * @name currentUser
       * @type {Object}
       * @description the logged in user or undefined
       */
      var currentUser = null;

      var userService = null;

      var userServiceName = 'UserService';

      var handlers = {
        loginStart: null,
        loginSuccess: null,
        locationChange: null
      };

      /**
       * @description
       * The actual service.
       */
      return {

        $get: ['$rootScope', '$location', '$route', '$injector',
          function ($rootScope, $location, $route, $injector) {

          if(!userService && userServiceName) {
            userService = $injector.get(userServiceName);
          }

          if (!userService) {
            throw new Error('$auth: please configure a userService');
          }

          if (!handlers.loginStart) {
            console.log('$auth: using default loginStart method')
          }

          if (!handlers.loginSuccess) {
            console.log('$auth: using default loginSuccess method')
          }

          if (!handlers.locationChange) {
            console.log('$auth: using default locationChange method')
          }

          /**
           * @name handleLoginStart
           * @description 
           * Default login starting logic.
           */
          handlers.loginStart = handlers.loginStart || function (redirect) {
            console.log("$auth: redirecting to /login");
            $location.path('/login');
            $location.search({
              redirect: encodeURIComponent(redirect)
            });
            return;
          };

          /**
           * @name handleLoginSuccess
           * @description
           * This method redirects the user to the redirect search term if
           * it exists.
           */
          handlers.loginSuccess = handlers.loginSuccess || function () {
            if($location.search().redirect) {        
              console.log("$auth: redirecting to", $location.search().redirect);
              $location.path($location.search().redirect);
            }
          };

          /**
           * @name handleLocationChange
           * @description
           * This method takes a user navigating, does a quick auth check
           * and if everything is alright proceeds.
           */
          handlers.locationChange = handlers.locationChange || function (event, next, current) {
            if(currentUser === null || !!currentUser){
              next = '/'+next.split('/').splice(3).join('/').split("?")[0];
              var route = $route.routes[next];
              console.log("$auth: Guest access to", next);
              console.log("$auth:",next, "is", route.public ? "public" : "private");
              if(!route.public) {
                $rootScope.$broadcast('$auth:loginStart');
                handlers.loginStart(next.substr(1));
                return;
              }
              console.log("$auth: proceeding to load", next);
            }
          };

          /**
           * @description
           * $rootScope hookups
           */
          $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if(!$route.current) {
              console.log("$auth: Welcome newcomer!");
              console.log("$auth: Checking your session...");
              userService.getCurrentUser().then(function (user) {
                console.log("$auth: we got", user)
                if(typeof handlers.locationChange === 'function') {
                  handlers.locationChange(event, next, current);
                }
              }, function (err) {
                console.log("$auth: request failed");
                console.log("$auth: proceeding as guest.");
                if(typeof handlers.locationChange === 'function') {
                  handlers.locationChange(event, next, current);
                }
              });
            } else {
              if(typeof handlers.locationChange === 'function') {
                handlers.locationChange(event, next, current);
              }
            }
          });

          $rootScope.$on('$auth:loginSuccess', function (event, next, current) {
            if(typeof handlers.locationChange === 'function') {
              handlers.loginSuccess(event, next, current);
            }
          });

          return {
            /**
             * @name getCurrentUser
             * @return {Object} the current user
             */
            getCurrentUser: function () {
              return currentUser;
            },

            /**
             * @name isLoggedIn
             * @return {Boolean} true or false if there is or not a current user
             */
            isLoggedIn: function () {
              return !!currentUser;
            },

            /**
             * @name login
             * @param  {Object} credentials the credentials to be passed to the login service
             * @return {Promise}            the promise your login service returns on login
             */
            login: function (credentials) {
              return userService.login(credentials).then(function (user) {
                if(user) {
                  currentUser = user;
                  $rootScope.$broadcast('$auth:loginSuccess');
                } else {
                  $rootScope.$broadcast('$auth:loginFailure')
                }
              }, function() {
                console.log("$auth: login error callback");
                currentUser = null;
                $rootScope.$broadcast('$auth:loginFailure');
              });
            },

            /**
             * @name logout
             * @return {Promise} the promise your login service returns on logout
             */
            logout: function () {
              $rootScope.$broadcast('$auth:logoutStart');
              return userService.logout().then(function () {
                $rootScope.$broadcast('$auth:logoutSuccess');
                currentUser = undefined;
              }, function () {
                $rootScope.$broadcast('$auth:logoutFailure');
              });
            }
          }
        
        }],

        /**
         * @name setUserService
         * @param  {String} usr the user service name
         */
        setUserService: function (usr) {
          if(typeof usr !== 'string') {
            throw new Error('$auth: setUserService expects a string to use $injector upon instantiation')
          } 
          userServiceName = usr;
        },
        
        /**
         * @name setHandler
         * @param  {String} key  the handler name
         * @param  {Function} foo    the handler function
         * @description
         * Replaces one of the default handlers.
         */
        setHandler: function (key, foo) {
          if( key.substr(0,6) !== 'handle' ) {
            throw new Error('$auth: Expecting a handler name that starts with \'handle\'.');
          }

          if ( ! handlers.hasOwnProperty(key) ) {
            throw new Error('$auth: handle name '+key+' is not a valid property.');
          }

          if ( typeof foo !== 'function') {
            throw new Error('$auth: handle name '+key+' is not a valid property.');
          }

          handlers[key] = foo;
        }
      }
  });
});