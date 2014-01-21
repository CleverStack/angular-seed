define(['angular', '../module'], function (ng) {
  'use strict';

  /**
   * @ngdoc service
   * @name ngSeed.services:CSSession
   * @description
   * A set of functions to easily login/logout, register new users, and
   * retrieving the user session from the server.
   *
   * ### Example
   * ```js
   * myApp.controller('Test', ['$scope', 'CSSession', function ($scope, CSSession) {
   *   $scope.$watch(CSSession.getCurrentUser, function() {
   *     // do something as soon as the user changes
   *     // and by this I mean logs in or out
   *   });
   *
   *   if(CSSession.isLoggedIn()) {
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
   * @name ngSeed.providers:CSSessionProvider
   * @description
   * Dead-easy auth checking.
   *
   * Please note that custom login requiring logic, on-location-change auth
   * checking, and default login success behaviour can be configured
   * using the authProvider on a config block.
   *
   * ### Configuring CSSessionProvider:
   * This is the default value, feel free to change it to something else if your app requires it:
   *
   * ```js
   * CSSessionProvider.setSessionService('sessionService');
   *
   * CSSessionProvider.setHandler('handleLoginStart', function (redirect) {
   *   $('#myLoginModal').open();
   * });
   *
   * CSSessionProvider.setHandler('handleLoginSuccess', function () {
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

  ng.module('cs_session.providers')
  .provider('CSSession', [
    function () {
      /**
       * @name currentUser
       * @type {Object}
       * @propertyOf ngSeed.providers:CSSessionProvider
       * @description
       * the logged in user or undefined
       */
      var currentUser = null;

      /**
       * @name sessionService
       * @type {Object}
       * @propertyOf ngSeed.providers:CSSessionProvider
       * @description
       * The user service.
       */
      var sessionService = null;

      /**
       * @name sessionServiceName
       * @type {String}
       * @propertyOf ngSeed.providers:CSSessionProvider
       * @description
       * The name of the service to $inject.
       */
      var sessionServiceName = 'CSSessionService';

      /**
       * @name handlers
       * @type {Object}
       * @propertyOf ngSeed.providers:CSSessionProvider
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

          if(!sessionService && sessionServiceName) {
            sessionService = $injector.get(sessionServiceName);
          }

          if (!sessionService) {
            throw new Error('CSSessionProvider: please configure a sessionService');
          }

          if (!handlers.loginStart) {
            console.log('CSSessionProvider: using default loginStart method');
          }

          if (!handlers.loginSuccess) {
            console.log('CSSessionProvider: using default loginSuccess method');
          }

          if (!handlers.locationChange) {
            console.log('CSSessionProvider: using default locationChange method');
          }

          /**
           * @ngdoc function
           * @name handlers.loginStart
           * @propertyOf ngSeed.providers:CSSessionProvider
           * @description
           * Default login starting logic.
           */
          handlers.loginStart = handlers.loginStart || function (redirect) {
            console.log('CSSessionProvider: redirecting to /login');
            $location.path('/login');
            $location.search({
              redirect: encodeURIComponent(redirect)
            });
            return;
          };

          /**
           * @ngdoc function
           * @name handlers.loginSuccess
           * @propertyOf ngSeed.providers:CSSessionProvider
           * @description
           * This method redirects the user to the redirect search term if
           * it exists.
           */
          handlers.loginSuccess = handlers.loginSuccess || function () {
            if($location.search().redirect) {
              console.log('CSSessionProvider: redirecting to', $location.search().redirect);
              $location.path($location.search().redirect);
              $location.search(false);
            } else {
              $location.path('/');
            }
          };

          /**
           * @ngdoc function
           * @name handlers.loginSuccess
           * @propertyOf ngSeed.providers:CSSessionProvider
           * @description
           * This method redirects the user to the redirect search term if
           * it exists.
           */
          handlers.logoutSuccess = handlers.logoutSuccess || function () {
            console.log('CSSessionProvider: redirecting to /');
            $location.path('/');
          };

          /**
           * @ngdoc function
           * @name handlers.locationChange
           * @propertyOf ngSeed.providers:CSSessionProvider
           * @description
           * This method takes a user navigating, does a quick auth check
           * and if everything is alright proceeds.
           */
          handlers.locationChange = handlers.locationChange || function (event, next, current) {
            next = '/' + next.split('/').splice(3).join('/').split('?')[0];
            if(currentUser === null || !currentUser.id){
              var route = $route.routes[next] || false;
              console.log('CSSessionProvider: Guest access to', next);
              console.log('CSSessionProvider:', next, 'is', route.public ? 'public' : 'private');
              if(route && !route.public) {
                $rootScope.$broadcast('CSSessionProvider:loginStart');
                handlers.loginStart(next.substr(1));
              }
            } else {
              console.log('CSSessionProvider: proceeding to load', next);
            }
          };

          /**
           * @description
           * $rootScope hookups
           */
          $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if(!$route.current) {
              console.log('CSSessionProvider: Welcome newcomer!');
              console.log('CSSessionProvider: Checking your session...');
              sessionService.getCurrentUser().then(function (user) {
                currentUser = user;
                console.log('CSSessionProvider: we got', user);
                if (angular.isFunction(handlers.locationChange)) {
                  handlers.locationChange(event, next, current);
                }
              }, function (err) {
                console.log('CSSessionProvider: request failed');
                console.log('CSSessionProvider: proceeding as guest.');
                if(angular.isFunction(handlers.locationChange)) {
                  handlers.locationChange(event, next, current);
                }
              });
            } else {
              if(angular.isFunction(handlers.locationChange)) {
                handlers.locationChange(event, next, current);
              }
            }
          });

          $rootScope.$on('CSSessionProvider:loginSuccess', function () {
            if(angular.isFunction(handlers.loginSuccess)) {
              handlers.loginSuccess();
            }
          });

          $rootScope.$on('CSSessionProvider:logoutSuccess', function () {
            if(angular.isFunction(handlers.logoutSuccess)) {
              handlers.logoutSuccess();
            }
          });

          $rootScope.$on('CSSessionProvider:loginRequired', function () {
            console.log('CSSessionProvider: login was required');
            $location.path('/login');
          });

          return {
            /**
             * @name getCurrentUser
             * @ngdoc function
             * @methodOf ngSeed.services:CSSession
             * @return {Object} the current user
             */
            getCurrentUser: function () {
              return currentUser;
            },

            /**
             * @name isLoggedIn
             * @ngdoc function
             * @methodOf ngSeed.services:CSSession
             * @return {Boolean} true or false if there is or not a current user
             */
            isLoggedIn: function () {
              return !!currentUser;
              // return (currentUser === null || !currentUser.id) ? false : true;
            },


            /**
             * @name login
             * @ngdoc function
             * @methodOf ngSeed.services:CSSession
             * @param  {Object} credentials the credentials to be passed to the login service
             * @return {Promise}            the promise your login service returns on login
             */
            login: function (credentials) {
              return sessionService.login(credentials).then(function (user) {
                if(user.id) {
                  currentUser = user;
                  $rootScope.$broadcast('CSSessionProvider:loginSuccess');
                } else {
                  $rootScope.$broadcast('CSSessionProvider:loginFailure');
                }
              }, function() {
                currentUser = null;
                $rootScope.$broadcast('CSSessionProvider:loginFailure');
              });
            },

            /**
             * @name logout
             * @ngdoc function
             * @methodOf ngSeed.services:CSSession
             * @return {Promise} the promise your login service returns on logout
             */
            logout: function () {
              $rootScope.$broadcast('CSSessionProvider:logoutSuccess');
              if(currentUser && currentUser.id) {
                return sessionService.logout().then(function () {
                  currentUser = null;
                });
              }
            },

            /**
             * @name authenticate
             * @ngdoc function
             * @methodOf ngSeed.services:CSSession
             * @return {Promise} the promise your login service returns on logout
             */
            authenticate: function (user) {
              if(!user || !user.id){
                throw new Error('Unable to authenticate with', user);
              }
              currentUser = user;
              $rootScope.$broadcast('CSSessionProvider:loginSuccess');
              $rootScope.$broadcast('CSSessionProvider:authenticated');
            }


          };

        }],

        /**
         * @ngdoc function
         * @methodOf ngSeed.providers:CSSessionProvider
         * @name setSessionService
         * @param  {String} usr the user service name
         */
        setSessionService: function (serviceName) {
          if (!angular.isString(serviceName)) {
            throw new Error('CSSessionProvider: setSessionService expects a string to use $injector upon instantiation');
          }
          sessionServiceName = serviceName;
        },

        /**
         * @ngdoc function
         * @methodOf ngSeed.providers:CSSessionProvider
         * @name setHandler
         * @param  {String} key  the handler name
         * @param  {Function} foo    the handler function
         * @description
         * Replaces one of the default handlers.
         */
        setHandler: function (key, foo) {
          if( key.substr(0, 6) !== 'handle' ) {
            throw new Error('CSSessionProvider: Expecting a handler name that starts with \'handle\'.');
          }

          if ( !handlers.hasOwnProperty(key) ) {
            throw new Error('CSSessionProvider: handle name "' + key + '" is not a valid property.');
          }

          if (!angular.isFunction(foo)) {
            throw new Error('CSSessionProvider: foo is not a function.');
          }

          handlers[key] = foo;
        }
      };
    }

  ]);

});
