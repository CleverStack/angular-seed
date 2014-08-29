define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  /**
   * @ngdoc service
   * @name ngSeed.services:HttpOptions
   * @description
   * This options can be plugged in the $httpProvider or
   * the $http object to set up application wide configuration
   * for HTTP requests.
   *
   * ### Examples
   * ```js
   * myApp.controller('Test', ['$scope', 'HttpOptions', function ($scope, HttpOptions) {
   *   if( /localhost/.test(HttpOptions.domain) ) {
   *     // you are working with your local server
   *   }
   * }]);
   * ```
   */

  /**
   * @ngdoc service
   * @name ngSeed.providers:HttpOptionsProvider
   * @description
   * The provider to configure the domain, port, headers and
   * interceptors for all the requests made with $http.
   *
   * ### Examples
   * ```js
   * myApp.config(['HttpOptionsProvider', function (HttpOptionsProvider) {
   *   HttpOptionsProvider.setDomain('http://www.google.com');
   *   HttpOptionsProvider.setWithCredentials(false);
   * }]);
   * ```
   */

  ng
  .module( 'cs_common.providers' )
  .provider('HttpOptions', function( $httpProvider, $injector ) {
   /**
    * @ngdoc property
    * @name withCredentials
    * @propertyOf ngSeed.providers:HttpOptionsProvider
    * @description
    * Should it send session information with every request?
    */
    var withCredentials = true;

   /**
    * @ngdoc property
    * @name domain
    * @propertyOf ngSeed.providers:HttpOptionsProvider
    * @description
    * For testing purposes this is extremely useful
    * it allows you to test the app against a aws server
    * running either in dev, staging or production
    */
    var domain    = 'http://localhost:8080';

    /**
     * If the clever-messenger module is installed use it to send messages to the user
     * @type {Function|Boolean}
     */
    var messenger = $injector.has( 'Messenger' ) ? $injector.get( 'Messenger' ) : false;

    // Update the $httpProvider with the default settings
    $httpProvider.defaults.withCredentials = withCredentials;

    /**
     * @ngdoc method
     * @name interceptors.addDomain
     * @methodOf ngSeed.providers:HttpOptionsProvider
     * @description
     * Interceptor.
     *
     * Add the domain to all the HTTP requests that are not
     * templates. And doesn't add it to absolute urls.
     *
     * Note: Hookup the $templates service to get the proper
     * regex. This works for now as is what we are using.
     */
    $httpProvider.interceptors.push( function( $rootScope, $timeout ) {
      return {
        request: function( config ) {
          if( ! /(.*).html$/.test( config.url ) && ! /^(http|https:\/\/)/i.test( config.url ) ) {
            config.url = domain + config.url;
          }
          return config;
        },
        responseError: function( res ) {
          if ( res.status === 401 && !/auth\/session/.test( res.config.url) ) {
            $rootScope.$broadcast( 'SessionProvider:signInRequired' );
            if ( !!messenger ) {
              $timeout( function() {
                messenger.warning( 'You are required to login to view that page.' );
              });
            }
          }
          throw res.data;
        }
      };
    });

    /*
     * @name Unauthorized
     * @methodOf ngSeed.services:HttpOptions
     * @param  {Object} $q the promise service
     * @return {Object}    An object with the handlers.
     * @description
     * Add the domain to all the HTTP requests that are not
     * templates.
     *
     * Note: Hookup the $templates service to get the proper
     * regex. This works for now as is what we are using.
     */
    // $httpProvider.interceptors.push(['$rootScope', '$q',function ($rootScope, $q) {
    //   return {
    //     response: function (res) {
    //       if(res.status === 401) {
    //         $rootScope.$broadcast('$auth:signInRequired');
    //       }
    //       return res.data;
    //     }
    //   }
    // }]);

    return {
      $get: function () {
        return {
          domain:           domain,
          withCredentials:  withCredentials
        };
      },

      /**
       * @ngdoc method
       * @name setDomain
       * @methodOf ngSeed.providers:HttpOptionsProvider
       * @param  {String} uri The domain.
       */
      setDomain: function( uri ) {
        if ( typeof uri !== 'string' ) {
          throw new Error( 'HttpOptions: expecting string for domain' );
        }
        domain = uri;
      },

      /**
       * @ngdoc method
       * @name setWithCredentials
       * @methodOf ngSeed.providers:HttpOptionsProvider
       * @param  {Boolean} value Should it send credentials?
       */
      setWithCredentials: function( value ) {
        if ( typeof value !== 'boolean' ) {
          throw new Error( 'HttpOptions: expecting value to be boolean' );
        }
        withCredentials = value;
      }
    };
  });
});
