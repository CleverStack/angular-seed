var services = angular.module('ngSeed.services');

/**
 * @ngdoc service
 * 
 * @name ngSeed.services:$httpOptions
 * 
 * @description
 * This options can be plugged in the $httpProvider or
 * the $http object to set up application wide configuration.
 */
services
  .value('$httpOptions', {
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
    withCredentials: true,

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
    domain: 'http://localhost:8080'
  });
