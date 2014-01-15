define(['angular', '../module'], function (ng) {
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
  }

  ng.module('cs_common.services')
  .service('CSResourceFactory',function () {
    return function (resourceName) {
      ng
      .module('app.resources') /* TODO: Convert this to provider and make module name configurable */
      .factory(resourceName, ResourceFactory(resourceName));
    };
  });
});
