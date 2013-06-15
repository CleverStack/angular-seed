'use strict';

var services = angular.module('app.services');

/**
 * httpOptions service.
 *
 * This options can be plugged in the $httpProvider or
 * the $http object to set up application wide configuration.
 */
services
  .value('httpOptions', {
    /**
     * Should it send or not session cookies
     * @type {Boolean}
     */
    withCredentials: true,

    /**
     * For testing purposes this is extremely useful
     * it allows you to test the app against a aws server
     * running either in dev, staging or production
     * @type {String}
     */
    domain: 'http://localhost:8080'
  });
