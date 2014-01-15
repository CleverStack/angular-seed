define(['angular', '../module'], function (ng) {
  'use strict';

  /**
   * @ngdoc service
   * @name ngSeed.services:CSTemplate
   * @description
   * This service facilitates the loading of templates (not yet extended to
   * ng-include) thru two functions.
   *
   * It can be configured using the CSTemplateProvider.
   *
   * ### Examples
   * ```js
   * CSTemplate.view('home');
   * // will look for /views/home.html
   *
   * CSTemplate.partial('navbar');
   * // will look for /views/partials/navbar.html
   * ```
   * This path can be changed using `CSTemplateProvider.setPath`.
   * The extension can be changed using `CSTemplateProvider.setExtension`.
   */

  /**
   * @ngdoc service
   * @name ngSeed.providers:CSTemplateProvider
   * @description
   * This provider can be used to configure the templates retrieved with the
   * CSTemplate service.
   *
   * ### Examples
   * ```js
   * CSTemplateProvider.setPath('/templates');
   * CSTemplateProvider.setExtension('.ejs');
   * // now calls like CSTemplate.view('home');
   * // will go to /templates/home.ejs
   * // and calls like CSTemplate.partial('navbar');
   * // will go to /templates/partials/navbar.ejs
   * ```
   */

  ng.module('cs_common.providers')
  .provider('CSTemplate', [
    function(){
      var basePath = '';
      try {
        basePath = document.getElementsByTagName('base')[0].href;
      } catch(e){
        console.warn('Unable to read href attr from base tag');
      }

      if(basePath.length) {
        if(basePath[basePath.length - 1] === '/') {
          basePath = basePath.slice(0, -1);
        }
      }

      /**
       * @name viewsPath
       * @type {String}
       * @propertyOf ngSeed.providers:CSTemplateProvider
       * @description
       * The path to the views.
       */
      var viewsPath = basePath + '/views/';

      /**
       * @name extension
       * @type {String}
       * @propertyOf ngSeed.providers:CSTemplateProvider
       * @description
       * The extension of the partials.
       */
      var extension = '.html';

      /**
       * @ngdoc method
       * @methodOf ngSeed.services:CSTemplate
       * @name view
       * @param  {String} viewName The name of the view.
       * @return {String}          The path to the view.
       * @description
       * Utility functions to get the path of a view.
       *
       * This method is also available from CSTemplateProvider
       */
      function view (viewName) {
        // console.log('CSTemplate:', viewsPath + viewName + extension);
        return viewsPath + viewName + extension;
      }

      /**
       * @description
       * The actual service.
       */
      return {

        $get: function () {
          return {
            view: view
          };
        },

        view: view,

        /**
         * @ngdoc method
         * @methodOf ngSeed.providers:CSTemplateProvider
         * @name setPath
         * @param  {String} path the path
         * @description
         * Changes the path of the views folder.
         */
        setPath: function (path) {
          if ( typeof path !== 'string') {
            throw new Error('CSTemplate: expecting a string for path.');
          }

          if(path[path.length - 1] !== '/') {
            path += '/';
          }

          viewsPath = basePath + path;

          // console.log('CSTemplate: path set to ', viewsPath);
        },

        /**
         * @ngdoc method
         * @methodOf ngSeed.providers:CSTemplateProvider
         * @name setExtension
         * @param  {String} ext the extension
         * @description
         * Changes the extension of the views files.
         */
        setExtension: function (ext) {
          if ( typeof ext !== 'string') {
            throw new Error('CSTemplate: expecting a string for extension.');
          }

          if(ext.substr(0) !== '.') {
            ext = '.' + ext;
          }

          extension = ext;

        }

      };

    }
  ]);

});
