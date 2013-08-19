define(['angular', 'app'],function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name ngSeed.services:$templates
   * @description
   * This service facilitates the loading of templates (not yet extended to
   * ng-include) thru two functions.
   *
   * It can be configured using the $templatesProvider.
   *
   * ### Examples
   * ```js
   * $templates.view('home');
   * // will look for /views/home.html
   *
   * $templates.partial('navbar');
   * // will look for /views/partials/navbar.html
   * ```
   * This path can be changed using `$templatesProvider.setPath`.
   * The extension can be changed using `$templatesProvider.setExtension`.
   */
  
  /**
   * @ngdoc service
   * @name ngSeed.providers:$templatesProvider
   * @description
   * This provider can be used to configure the templates retrieved with the
   * $templates service.
   *
   * ### Examples
   * ```js
   * $templatesProvider.setPath('/templates');
   * $templatesProvider.setExtension('.ejs');
   * // now calls like $templates.view('home');
   * // will go to /templates/home.ejs
   * // and calls like $templates.partial('navbar');
   * // will go to /templates/partials/navbar.ejs
   * ```
   */
  angular
  .module('app.services')
  .provider('$templates', function () {
      var basePath = document.getElementsByTagName('base')[0].href;
      if(basePath[basePath.length-1] === '/') {
        basePath = basePath.slice(0,-1);
      }
      /**
       * @name viewsPath
       * @type {String}
       * @propertyOf ngSeed.providers:$templatesProvider
       * @description
       * The path to the views.
       */
      var viewsPath = basePath+'/views/';

      /**
       * @name partialsPath
       * @type {String}
       * @propertyOf ngSeed.providers:$templatesProvider
       * @description
       * The path to the partials.
       */
      var partialsPath = viewsPath+'partials/';

      /**
       * @name extension
       * @type {String}
       * @propertyOf ngSeed.providers:$templatesProvider
       * @description 
       * The extension of the partials.
       */
      var extension = '.html';

      /**
       * @ngdoc method
       * @methodOf ngSeed.services:$templates
       * @name view
       * @param  {String} viewName The name of the view.
       * @return {String}          The path to the view.
       * @description 
       * Utility functions to get the path of a view.
       *
       * This method is also available from $templatesProvider
       */
      function view (viewName) {
        console.log("$templates:",viewsPath+viewName+extension);
        return viewsPath+viewName+extension;
      }

      /**
       * @ngdoc method
       * @methodOf ngSeed.services:$templates
       * @name partial
       * @param  {String} section The folder path to look into.
       * @param  {String} partialName The name of the partial.
       * @return {String}          The path to the partial.
       * @description 
       * Utility functions to get the path of a partial.
       *
       * This method is also available from $templatesProvider
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

      /**
       * @description
       * The actual service.
       */
      return {

        $get: function () {
          return {
            view: view,
            partial: partial   
          }
        },

        view: view,
        partial: partial,
        
        /**
         * @ngdoc method
         * @methodOf ngSeed.providers:$templatesProvider
         * @name setPath
         * @param  {String} path the path
         * @description
         * Changes the path of the views folder.
         */
        setPath: function (path) {
          if ( typeof path !== 'string') {
            throw new Error('$templates: expecting a string for path.');
          }     

          if(path[path.length-1] !== '/') {
            path += '/';
          }

          viewsPath = basePath+path;
          partialsPath = viewsPath+'/partials';          

          console.log("$templates: path set to",viewsPath);
        },

        /**
         * @ngdoc method
         * @methodOf ngSeed.providers:$templatesProvider
         * @name setExtension
         * @param  {String} ext the extension
         * @description
         * Changes the extension of the views files.
         */
        setExtension: function (ext) {
          if ( typeof ext !== 'string') {
            throw new Error('$templates: expecting a string for extension.');
          }

          if(ext.substr(0) !== '.') {
            ext = '.'+ext;
          }

          extension = value;

        }
      }
  });
});