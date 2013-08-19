define(['angular', 'app'],function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name ngSeed.services:$resourceFactory
   * @description
   * A service used to generate and register resources.
   */
  
  /**
   * @ngdoc function
   * @name ngSeed.services:ResourceFactory
   * @methodOf ngSeed.services:$resourceFactory
   * @param {String} resourceName The name of the resource.
   * @description
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
     * @name builder
     * @methodOf ngSeed.services:$resourceFactory
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
      var url = $httpOptions.domain+'/'+resourceName+'/:id';
      var defaults = {};
      var actions =  {
        'get':    {method:'GET'},
        'query':  {method:'GET`', isArray:true},
        'save':   {method:'PUT'},
        'create': {method:'POST'},
        'destroy':{method:'DELETE'},
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