'use strict';

var services = angular.module('app.services');

/**
 * Session Service
 *
 * This service uses $http and httpOptions to access some default
 * session handling routes.
 */
services
  .factory('SessionService', ['$http','httpOptions',function ($http, httpOptions) {
    var session = {};

    /**
     * Return the session object from the server
     * @return {object} Session data
     */
    session.getSession = function () {
      return $http.get(httpOptions.domain+'/user/session');
    };

    /**
     * Login into the server
     * @param  {object} params Login credentials
     * @return {object}        Server response
     */
    session.login = function( params ) {
      return $http.post(httpOptions.domain+'/user/login/', params);
    };

    /**
     * Logout from the server
     * @return {object} Server response
     */
    session.logout = function() {
      return $http.get( httpOptions.domain+'/user/logout' );
    };

    return session;
  }]);
