define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  /**
   * @ngdoc service
   * @name ngSeed.services:Template
   * @description
   * This service facilitates the loading of templates (not yet extended to
   * ng-include) thru two functions.
   *
   * It can be configured using the TemplateProvider.
   *
   * ### Examples
   * ```js
   * Template.view('home');
   * // will look for /views/home.html
   *
   * Template.partial('navbar');
   * // will look for /views/partials/navbar.html
   * ```
   * This path can be changed using `TemplateProvider.setPath`.
   * The extension can be changed using `TemplateProvider.setExtension`.
   */

  ng
  .module( 'cs_common.providers' )
  .provider( 'Template', [
    function() {
      var basePath = '';
      try {
        basePath = document.getElementsByTagName( 'base' )[ 0 ].href;
      } catch( e ) {
        console && console.warn && console.warn( 'Unable to read href attr from base tag' );
      }

      if( basePath.length ) {
        if( basePath[ basePath.length - 1 ] === '/' ) {
          basePath = basePath.slice( 0, -1 );
        }
      }

      /**
       * @name viewsPath
       * @type {String}
       * @propertyOf ngSeed.providers:TemplateProvider
       * @description
       * The path to the views.
       */
      var viewsPath = basePath + '/:moduleName/views/';

      /**
       * @name partialsPath
       * @type {String}
       * @propertyOf ngSeed.providers:$templatesProvider
       * @description
       * The path to the partials.
       */
      var partialsPath = viewsPath + '/:section/partials/';

      /**
       * @name extension
       * @type {String}
       * @propertyOf ngSeed.providers:TemplateProvider
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
       * This method is also available from TemplateProvider
       */
      function view( moduleName, viewName ) {
        var templatePath;

        if ( arguments.length === 1 ) {
          viewName = moduleName;
          moduleName = 'app';
        }

        templatePath = viewsPath.replace( ':moduleName', moduleName ) + viewName + extension;
        // console && console.log && console.log( 'Template.view( ' + templatePath + ' )' );

        return templatePath;
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
      function partial( moduleName, section, partialName ) {
        var partialPath;

        if ( arguments.length !== 3 ) {
          partialName = section;
          section     = moduleName + '/';
          moduleName  = 'app';

        } else if ( arguments.length === 1 ) {
          partialName = moduleName;
          moduleName  = 'app';
          section     = '';
        }

        partialPath  = partialsPath.replace( ':moduleName', moduleName ).replace( ':section', section ) + partialName + extension;

        return partialPath;
      }


      /**
       * @description
       * The actual service.
       */
      return {

        $get: function() {
          return {
            view:    view,
            partial: partial
          };
        },

        view: view,
        partial: partial,

        /**
         * @ngdoc method
         * @methodOf ngSeed.providers:TemplateProvider
         * @name setPath
         * @param  {String} path the path
         * @description
         * Changes the path of the views folder.
         */
        setPath: function( path ) {
          if ( typeof path !== 'string') {
            throw new Error( 'Template: expecting a string for path.' );
          }

          if ( path[ path.length - 1 ] !== '/' ) {
            path += '/';
          }

          viewsPath     = basePath + path;
          partialsPath  = viewsPath + ':section/partials/';
        },

        /**
         * @ngdoc method
         * @methodOf ngSeed.providers:TemplateProvider
         * @name setExtension
         * @param  {String} ext the extension
         * @description
         * Changes the extension of the views files.
         */
        setExtension: function( ext ) {
          if ( typeof ext !== 'string') {
            throw new Error( 'Template: expecting a string for extension.' );
          }

          if( ext.substr( 0 ) !== '.'  ) {
            ext = '.' + ext;
          }

          extension = ext;

        }

      };

    }
  ]);

});
