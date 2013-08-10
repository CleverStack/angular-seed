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
   .provider('$httpOptions', function() {
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

      return {
        $get: function () {

          angular.config(['$httpProvider'], function ($httpProvider) {
            $httpProvider.defaults.withCredentials = withCredentials;
          });
          // Here add the interceptors to add the domain
          // to all requests
          // and the other options.

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
  });
})
