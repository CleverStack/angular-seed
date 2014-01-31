define(['angular', 'application'], function (ng) {
  'use strict';

  ng.module('app.providers')
  .provider('Helpers', [
    function () {

      var helpers = {};
      var inheritedProvider;

      /**
       * @description
       * The actual service.
       */
      return {
        $get: [
          '$injector',
          function ($injector) {

            if(inheritedProvider){
              var provider = $injector.get(inheritedProvider);
              if(!provider){
                throw new Error('Unable to inject "' + inheritedProvider + '"');
              }
              ng.copy(provider, helpers);
            }

            /**
             * Define your own helper functions here
             *
             * helpers.uppercase = function(string){
             *   return string.toUpperCase();
             * }
             */

            return helpers;

          }
        ],

        /**
         * @ngdoc function
         * @methodOf ngSeed.providers:CSAccountProvider
         * @name setAccountService
         * @param  {String} serviceName the account service name
         */
        extend: function (providerName) {
          if(typeof providerName !== 'string') {
            throw new Error('CSHelpersProvider: extend method expects a string (name of the helpers provider)');
          }
          inheritedProvider = providerName;
        }

      };

    }

  ]);

});
