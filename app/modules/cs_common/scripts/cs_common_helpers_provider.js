define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_common.providers')
  .provider('CSCommonHelpers', [
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
          '$location',
          '$log',
          function ($injector, $location, $log) {

            if(inheritedProvider){
              var provider = $injector.get(inheritedProvider);
              if(!provider){
                throw new Error('Unable to inject "' + inheritedProvider + '"');
              }
              ng.copy(provider, helpers);
            }

            helpers.hasError = function($scope, fieldName, validation, validateOnSubmit){
              if(!$scope.form){
                throw new Error('Expected scope to have a formController registered at scope.form');
              }
              var field = $scope.form[fieldName];
              if(!field){
                throw new Error('Expected scope.form to have a field \'' + fieldName + '\'');
              }

              if(validateOnSubmit && !$scope.submitted){
                return false;
              }

              if(validation){
                return (field.$dirty && field.$error[validation]) || ($scope.submitted && field.$error[validation]);
              }
              return !!( (field.$dirty && field.$invalid) || ($scope.submitted && field.$invalid) );
            };

            helpers.isActive = function(path){
              return (new RegExp(path, 'gi')).test($location.path());
            };

            helpers.redirect = function(path, $event){
              if($event){
                $event.stopPropagation();
                $event.preventDefault();
              }

              if(!path){
                return $log.error('Path not provided');
              }

              $location.url(path);
              return false;
            };

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
          if(typeof serviceName !== 'string') {
            throw new Error('CSHelpersProvider: extend method expects a string (name of the helpers provider)');
          }
          inheritedProvider = providerName;
        }

      };

    }

  ]);

});
