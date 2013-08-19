define(['angular', 'app'],function (angular, app) {
  'use strict';

  /**
   * @ngdoc service
   * @name ngSeed.services:$httpOptions
   * @description
   * This options can be plugged in the $httpProvider or
   * the $http object to set up application wide configuration
   * for HTTP requests.
   *
   * ### Examples
   * ```js
   * myApp.controller('Test', ['$scope', '$httpOptions', function ($scope, $httpOptions) {
   *   if( /localhost/.test($httpOptions.domain) ) {
   *     // you are working with your local server
   *   }
   * }]);
   * ```
   */
  
  /**
   * @ngdoc service
   * @name ngSeed.providers:$httpOptionsProvider
   * @description
   * The provider to configure the domain, port, headers and
   * interceptors for all the requests made with $http.
   *
   * ### Examples
   * ```js
   * myApp.config(['$httpOptionsProvider', function ($httpOptionsProvider) {
   *   $httpOptionsProvider.setDomain('http://www.google.com');
   *   $httpOptionsProvider.setWithCredentials(false);
   * }]);
   * ```
   */
   angular
   .module('app.services')
   .provider('$httpOptions', ['$httpProvider'
   , function ($httpProvider) {
     /**
      * @ngdoc property
      * @name withCredentials
      * @propertyOf ngSeed.providers:$httpOptionsProvider
      * @description
      * Should it send session information with every request?
      */
      var withCredentials = true;

     /**
      * @ngdoc property
      * @name domain
      * @propertyOf ngSeed.providers:$httpOptionsProvider
      * @description
      * For testing purposes this is extremely useful
      * it allows you to test the app against a aws server
      * running either in dev, staging or production
      */
      var domain = 'http://localhost:8080';

      $httpProvider.defaults.withCredentials = withCredentials;

      /**
       * @ngdoc method
       * @name interceptors.addDomain
       * @methodOf ngSeed.providers:$httpOptionsProvider
       * @description
       * Interceptor.
       * 
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

      /*
       * @name Unauthorized
       * @methodOf ngSeed.services:$httpOptions
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

        /**
         * @ngdoc method
         * @name setDomain
         * @methodOf ngSeed.providers:$httpOptionsProvider
         * @param  {String} uri The domain.
         */
        setDomain: function (uri) {
          if(typeof uri !== 'string') {
            throw new Error('$httpOptions: expecting string for domain');
          }
          domain = uri;
        },

        /**
         * @ngdoc method
         * @name setWithCredentials
         * @methodOf ngSeed.providers:$httpOptionsProvider
         * @param  {Boolean} value Should it send credentials?
         */
        setWithCredentials: function (value) {
          if(typeof value !== 'boolean') {
            throw new Error('$httpOptions: expecting value to be boolean');
          }
          withCredentials = value;
        }
      }
  }]);
})
