/**
 * @ngdoc service
 * @name ngSeed.services:GenericService
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
 *   .factory('ResourceService', GenericService('resource'));
 * ```
 */
function GenericService ( resourceName ) {
  
  'use strict';
  
  /**
   * @ngdoc function
   * @name ngSeed.services:GenericService:builder
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
      'get':    {method:'GET', withCredentials: true},
      'query':  {method:'GET', isArray:true, withCredentials: true},
      'save':   {method:'POST', withCredentials: true},
      'create': {method:'POST', withCredentials: true},
      'update': {method:'PUT', withCredentials: true},
      'remove': {method:'DELETE', withCredentials: true},
      'destroy':{method:'DELETE', withCredentials: true},
      'delete': {method:'DELETE', withCredentials: true}
    };
    return $resource(url, defaults, actions);
  };
 
  return ['$resource','$httpOptions',builder];
};

var services = angular.module('ngSeed.services');

