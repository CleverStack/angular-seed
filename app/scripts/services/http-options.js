define(['angular', 'app'],function (angular, app) {
  'use strict';

  /**
   * @ngdoc service
   * 
   * @name ngSeed.services:$httpOptions
   * 
   * @description
   * This options can be plugged in the $httpProvider or
   * the $http object to set up application wide configuration.
   */
   angular
   .module('app.services')
   .provider('$httpOptions', ['$httpProvider'
   ,function ($httpProvider) {
     /**
      * @ngdoc property
      * 
      * @name withCredentials
      * 
      * @propertyOf ngSeed.services:$httpOptions
      *
      * @description
      * Should it send session information with every request?
      */
     var withCredentials = true;

     /**
      * @ngdoc property
      * 
      * @name domain
      * 
      * @propertyOf ngSeed.services:$httpOptions
      * 
      * @description
      * For testing purposes this is extremely useful
      * it allows you to test the app against a aws server
      * running either in dev, staging or production
      */
      var domain = 'http://localhost:8080';

      $httpProvider.defaults.withCredentials = withCredentials;

      /**
       * @name AddDomain
       * @ngdoc interceptor
       * @param  {Object} $q the promise service
       * @return {Object}    An object with the handlers.
       * @description
       * Add the domain to all the HTTP requests that are not
       * templates.
       *
       * Note: Hookup the $templates service to get the proper
       * regex. This works for now as is what we are using.
       */
      $httpProvider.interceptors.push(function ($q) {
        return {
          request: function (config) {
            if(! /views\/(.*).html$/.test(config.url)) {
              config.url = domain+config.url;
            }
            return config;
          }
        }
      });

      /**
       * @name Unauthorized
       * @ngdoc interceptor
       * @param  {Object} $q the promise service
       * @return {Object}    An object with the handlers.
       * @description
       * Add the domain to all the HTTP requests that are not
       * templates.
       *
       * Note: Hookup the $templates service to get the proper
       * regex. This works for now as is what we are using.
       */
      // $httpProvider.interceptors.push(['$rootScope', '$q',function ($rootScope, $q) {
      //   return {
      //     response: function (res) {
      //       if(res.status === 401) {
      //         $rootScope.$broadcast('$auth:loginRequired');
      //       }
      //       return res.data;
      //     }
      //   }
      // }]);

      return {
        $get: function () {
          return {
            withCredentials: withCredentials,
            domain: domain
          }
        },

        setDomain: function (uri) {
          if(typeof uri !== 'string') {
            throw new Error('$httpOptions: expecting string for domain');
          }
          domain = uri;
        },

        setWithCredentials: function (value) {
          if(typeof value !== 'boolean') {
            throw new Error('$httpOptions: expecting value to be boolean');
          }
          withCredentials = value;
        }
      }
  }]);
})
