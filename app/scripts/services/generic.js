'use strict';

/**
 * Generates a factory function that uses ngResource
 * to talk to a REST resource that can be directly used
 * with angular.module.factory
 * @param {string} resourceName The resource name
 */
function GenericService ( resourceName ) {
  
  /**
   * Generic resource function
   * @param  {injected dep} $resource ngResource
   * @return {resource}           The actual resource for resourceName
   */
  var generic = function ( $resource, httpOptions ) {
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
 
  return ['$resource','httpOptions',generic];
};

var services = angular.module('app.services');

services
  .factory('ResourceService', GenericService('resource'));

