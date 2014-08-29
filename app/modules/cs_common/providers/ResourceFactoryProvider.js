define( [ 'angular', 'underscore', 'inflection', '../module' ], function( ng, _, inflection ) {
  'use strict';

  ng
  .module( 'cs_common.providers' )
  .provider( 'ResourceFactory', [
    function () {

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
      function ResourceFactory( resourceUrl, defaultParams, actions ) {

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
        var builder = function ( $resource, HttpOptions ) {
          var singularUrl = HttpOptions.domain + inflection.singularize( resourceUrl ) + '/:id/:action'
            , pluralUrl   = HttpOptions.domain + inflection.pluralize( resourceUrl ) + '/:action';

          actions = _.extend(
            {
              list: {
                method:   'GET',
                url:      pluralUrl,
                isArray:  true
              },
              get: {
                method:   'GET'
              },
              save: {
                method:   'PUT'
              },
              create: {
                method:   'POST'
              },
              destroy: {
                method:   'DELETE'
              }
            },
            actions
          );

          return $resource( singularUrl, defaultParams, actions );
        };

        return [ '$resource', 'HttpOptions', builder ];
      }

      /**
       * @description
       * The actual service.
       */
      return {
        $get: [
          '$injector',
          function( $injector ) {
            return function( resourceUrl, defaultParams, actions ) {

              // ng
              // .module( 'app.resources' )
              // .factory( resourceName, ResourceFactory( resourceName ) );

              return $injector.instantiate( new ResourceFactory( resourceUrl, defaultParams, actions ) );
            };
          }
        ]
      };

    }

  ]);

});
