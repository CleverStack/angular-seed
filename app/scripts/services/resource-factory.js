define(['angular', 'app'],function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name ngSeed.services:ResourceFactory
   * @param {String} resourceName The name of the resource.
   * @description
   * 
   * Generates a factory function that uses ngResource
   * to talk to a REST resource that can be directly used
   * with factory.
   *
   * Example of use with factory:
   * ```js
   * services
   *   .factory('ResourceService', ResourceFactory('resource'));
   * ```
   */
  function ResourceFactory ( resourceName ) {

    /**
     * @ngdoc function
     * @name ngSeed.services:ResourceFactory:builder
     * @description
     * 
     * Generates an HTTP Resource.
     *
     * @param {$resource} $resource ngResource
     * @param {$httpOptions} $httpOptions The HTTP Options object.
     * 
     * @return {resource} The actual resource for resourceName.
     */
    var builder = function ( $resource, $httpOptions ) {
      var url = httpOptions.domain+'/'+resourceName+'/:id';
      var defaults = {};
      var actions =  {
        'get':    {method:'GET', withCredentials: $httpOptions.withCredentials},
        'query':  {method:'GET', isArray:true, withCredentials: $httpOptions.withCredentials},
        'save':   {method:'POST', withCredentials: $httpOptions.withCredentials},
        'create': {method:'POST', withCredentials: $httpOptions.withCredentials},
        'update': {method:'PUT', withCredentials: $httpOptions.withCredentials},
        'remove': {method:'DELETE', withCredentials: $httpOptions.withCredentials},
        'destroy':{method:'DELETE', withCredentials: $httpOptions.withCredentials},
        'delete': {method:'DELETE', withCredentials: $httpOptions.withCredentials}
      };
      return $resource(url, defaults, actions);
    };
   
    return ['$resource', '$httpOptions', builder];
  };

  angular
  .module('app.services')
  .service('$resourceFactory',function () {
    return function (resourceName) {
      angular
      .module('app.resources')
      .factory(resourceName,ResourceFactory(resourceName));
    }
  });
});