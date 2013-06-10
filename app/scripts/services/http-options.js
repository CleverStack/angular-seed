'use strict';

var services = angular.module('app.services');

services
  .value('httpOptions', {
    // Used to allow X-Origin Session
    withCredentials: true,
    // For testing purposes this is extremely useful
    // It allows you to test the app against a aws server
    // Running either in dev, staging or production
    domain: 'http://localhost:8080'
  });
