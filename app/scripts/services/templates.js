define(['angular', 'app'],function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name $auth
   * @description
   * Dead-easy auth checking.
   * 
   * Please note that custom login requiring logic, on-location-change auth
   * checking, and default login success behaviour can be configured
   * using the authProvider on a config block.
   */
  angular
  .module('app.services')
  .provider('$auth', function () {
      /**
       * @name viewsPath
       * @type {String}
       * @description
       * The path to the views.
       */
      var viewsPath = 'views/';

      /**
       * @name partialsPath
       * @type {String}
       * @description
       * The path to the partials.
       */
      var partialsPath = viewsPath+'partials/';

      /**
       * @name extension
       * @type {String}
       * @description 
       * The extension of the partials.
       */
      var extension = '.html';

      /**
       * @description
       * The actual service.
       */
      return {

        $get = function () {
          return {
             /**
               * @ngdoc method
               * @name ngSeed.services:templates.view
               * @param  {String} viewName The name of the view.
               * @return {String}          The path to the view.
               * @description 
               * Utility functions to get the path of a view.
               */
              function view (viewName) {
                return viewsPath+viewName+extension;
              }

              /**
               * @ngdoc method
               * @name ngSeed.services:templates.partial
               * @param  {String} section The folder path to look into.
               * @param  {String} partialName The name of the partial.
               * @return {String}          The path to the partial.
               * @description 
               * Utility functions to get the path of a partial.
               */
              function partial (section, partialName) {
                var url;
                if(partialName === undefined) {
                  url = partialsPath+section;
                } else {
                  url = section+'/partials/'+partialName;
                }
                url += extension;
                return url;
              }
          }
        
        },
        
        set = function (key, value) {
          if ( typeof key !== 'string') {
            throw new Error('$templates: expecting a string for key.');
          }

          if ( typeof value !== 'string') {
            throw new Error('$templates: expecting a string for value.');
          }
        }
      }
  });
});