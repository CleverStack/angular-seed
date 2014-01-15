define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_account.providers')
  .provider('CSAccount', [
    function () {

      /**
       * @name accountService
       * @type {Object}
       * @propertyOf ngSeed.providers:CSAccountProvider
       * @description
       * The user service.
       */
      var accountService = null;

      /**
       * @name accountServiceName
       * @type {String}
       * @propertyOf ngSeed.providers:CSAccountProvider
       * @description
       * The name of the service to $inject.
       */
      var accountServiceName = 'CSAccountService';

      /**
       * @name handlers
       * @type {Object}
       * @propertyOf ngSeed.providers:CSAccountProvider
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

        $get: [
          '$injector',
          '$rootScope',
          function ($injector, $rootScope) {

            if(!accountService && accountServiceName) {
              accountService = $injector.get(accountServiceName);
            }

            if (!handlers.registrationSuccess) {
              console.log('CSAccountProvider: using default registrationSuccess method');
            }

            if (!handlers.registrationFailure) {
              console.log('CSAccountProvider: using default registrationFailure method');
            }

            /**
             * @ngdoc function
             * @name handlers.registrationSuccess
             * @propertyOf ngSeed.providers:CSAccountProvider
             * @description
             */
            handlers.registrationSuccess = handlers.registrationSuccess || function (user) {
              console.log(user);
              $rootScope.$broadcast('CSAccountProvider:registrationSuccess', user);
            };

            /**
             * @ngdoc function
             * @name handlers.registrationFailure
             * @propertyOf ngSeed.providers:CSAccountProvider
             * @description
             */
            handlers.registrationFailure = handlers.registrationFailure || function (response) {
              console.log(response);
              $rootScope.$broadcast('CSAccountProvider:registrationFailure', response);
            };


            return {

              /**
               * @name register
               * @ngdoc function
               * @methodOf ngSeed.services:CSSession
               * @param  {Object} credentials the user credentials
               * @return {Promise}             the promise your user service returns on registration.
               */
              register: function (credentials) {
                return accountService.register(credentials)
                  .then(function(user){
                    handlers.registrationSuccess(user);
                    $rootScope.$broadcast('CSAccountProvider:registrationSuccess', user);
                  }, handlers.registrationFailure);
              }

            };

          }
        ],

        /**
         * @ngdoc function
         * @methodOf ngSeed.providers:CSAccountProvider
         * @name setAccountService
         * @param  {String} serviceName the account service name
         */
        setAccountService: function (serviceName) {
          if(typeof serviceName !== 'string') {
            throw new Error('CSAccountProvider: setAccountService expects a string for the account service');
          }
          accountServiceName = serviceName;
        },

        /**
         * @ngdoc function
         * @methodOf ngSeed.providers:CSAccountProvider
         * @name setHandler
         * @param  {String} key - the handler name
         * @param  {Function} foo - the handler function
         * @description
         * Replaces one of the default handlers.
         */
        setHandler: function (key, foo) {

          if (!handlers.hasOwnProperty(key)) {
            throw new Error('CSAccountProvider: handle name "' + key + '" is not a valid property.');
          }

          if (typeof foo !== 'function') {
            throw new Error('CSAccountProvider: ' + foo + ' is not a function.');
          }

          handlers[key] = foo;
        }

      };

    }

  ]);

});
