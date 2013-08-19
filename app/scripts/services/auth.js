define(['angular', 'app'], function (angular, app) {
  'use strict';

  /**
   * @ngdoc service
   * @name ngSeed.services:$auth
   * @description
   * A set of functions to easily login/logout, register new users, and
   * retrieving the user session from the server.
   *
   * ### Example
   * ```js
   * myApp.controller('Test', ['$scope', '$auth', function ($scope, $auth) {
   *   $scope.$watch($auth.getCurrentUser, function() {
   *     // do something as soon as the user changes
   *     // and by this I mean logs in or out
   *   });
   *
   *   if($auth.isLoggedIn()) {
   *     // do something if the user is logged in
   *     // thou this is not necessary on non-public pages
   *     // on public ones you might want to use it
   *     // to do some other logic
   *   }
   * }]);
   * ```
   */
  
  /**
   * @ngdoc service
   * @name ngSeed.providers:$authProvider
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
       * @propertyOf ngSeed.providers:$authProvider
       * @description
       * the logged in user or undefined
       */
      var currentUser = null;

      /**
       * @name userService
       * @type {Object}
       * @propertyOf ngSeed.providers:$authProvider
       * @description 
       * The user service.
       */
      var userService = null;

      /**
       * @name userServiceName
       * @type {String}
       * @propertyOf ngSeed.providers:$authProvider
       * @description
       * The name of the service to $inject.
       */
      var userServiceName = 'UserService';

      /**
       * @name handlers
       * @type {Object}
       * @propertyOf ngSeed.providers:$authProvider
       * @description 
       * The handlers object.
       */
      var handlers = {
        loginStart: null,
        loginSuccess: null,
        logoutSuccess: null,
        locationChange: null,
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
           * @ngdoc function
           * @name handlers.loginStart
           * @propertyOf ngSeed.providers:$authProvider
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
           * @ngdoc function
           * @name handlers.loginSuccess
           * @propertyOf ngSeed.providers:$authProvider
           * @description
           * This method redirects the user to the redirect search term if
           * it exists.
           */
          handlers.loginSuccess = handlers.loginSuccess || function () {
            if($location.search().redirect) {        
              console.log("$auth: redirecting to", $location.search().redirect);
              $location.path($location.search().redirect);
              $location.search(false);
            } else {
              $location.path('/');
            }
          };

          /**
           * @ngdoc function
           * @name handlers.loginSuccess
           * @propertyOf ngSeed.providers:$authProvider
           * @description
           * This method redirects the user to the redirect search term if
           * it exists.
           */
          handlers.logoutSuccess = handlers.logoutSuccess || function () {
            console.log("$auth: redirecting to /");
            $location.path('/');
          };

          /**
           * @ngdoc function
           * @name handlers.locationChange
           * @propertyOf ngSeed.providers:$authProvider
           * @description
           * This method takes a user navigating, does a quick auth check
           * and if everything is alright proceeds.
           */
          handlers.locationChange = handlers.locationChange || function (event, next, current) {
            next = '/'+next.split('/').splice(3).join('/').split("?")[0];
            if(currentUser === null || !currentUser.id){
              var route = $route.routes[next] || false;
              console.log("$auth: Guest access to", next);
              console.log("$auth:",next, "is", route.public ? "public" : "private");
              if(route && !route.public) {
                $rootScope.$broadcast('$auth:loginStart');
                debugger;
                handlers.loginStart(next.substr(1));
              }
            } else {
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
                currentUser = user;
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

          $rootScope.$on('$auth:logoutSuccess', function () {
            if(typeof handlers.logoutSuccess === 'function') {
              handlers.logoutSuccess();
            }
          })

          $rootScope.$on('$auth:loginRequired', function () {
            console.log("$auth: login was required");
            $location.path('/login');
          });

          return {
            /**
             * @name getCurrentUser
             * @ngdoc function
             * @methodOf ngSeed.services:$auth
             * @return {Object} the current user
             */
            getCurrentUser: function () {
              return currentUser;
            },

            /**
             * @name isLoggedIn
             * @ngdoc function
             * @methodOf ngSeed.services:$auth
             * @return {Boolean} true or false if there is or not a current user
             */
            isLoggedIn: function () {
              return !!currentUser;
              // return (currentUser === null || !currentUser.id) ? false : true;
            },

            /**
             * @name register
             * @ngdoc function
             * @methodOf ngSeed.services:$auth
             * @param  {Object} credentials the user credentials
             * @return {Promise}             the promise your user service returns on registration.
             */
            register: function (credentials) {
              if(credentials.password !== credentials.passwordConfirmation) {
                $rootScope.$broadcast('$auth:registrationFailure', "Passwords don't match");
                return;
              }
              
              delete credentials.passwordConfirmation;

              return userService.register(credentials).then(function (user) {
                if(user.id) {
                  currentUser = user;
                  $rootScope.$broadcast('$auth:registrationSuccess');
                  $rootScope.$broadcast('$auth:loginSuccess');
                } else {
                  currentUser = null;
                  $rootScope.$broadcast('$auth:registrationFailure');
                }
              }, function () {
                currentUser = null;
                $rootScope.$broadcast('$auth:registrationFailure');
              })
            },

            /**
             * @name login
             * @ngdoc function
             * @methodOf ngSeed.services:$auth
             * @param  {Object} credentials the credentials to be passed to the login service
             * @return {Promise}            the promise your login service returns on login
             */
            login: function (credentials) {
              return userService.login(credentials).then(function (user) {
                if(user.id) {
                  currentUser = user;
                  $rootScope.$broadcast('$auth:loginSuccess');
                } else {
                  $rootScope.$broadcast('$auth:loginFailure')
                }
              }, function() {
                currentUser = null;
                $rootScope.$broadcast('$auth:loginFailure');
              });
            },

            /**
             * @name logout
             * @ngdoc function
             * @methodOf ngSeed.services:$auth
             * @return {Promise} the promise your login service returns on logout
             */
            logout: function () {
              $rootScope.$broadcast('$auth:logoutSuccess');
              if(currentUser && currentUser.id) {
                return userService.logout().then(function () {
                  currentUser = null;
                });
              }
            }
          }
        
        }],

        /**
         * @ngdoc function
         * @methodOf ngSeed.providers:$authProvider
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
         * @ngdoc function
         * @methodOf ngSeed.providers:$authProvider
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
            throw new Error('$auth: foo is not a function.');
          }

          handlers[key] = foo;
        }
      }
  });
});