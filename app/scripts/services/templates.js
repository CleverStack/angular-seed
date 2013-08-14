define(['angular', 'app'],function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name $templates
   * @description
   * Configurable Templates provider.
   */
  angular
  .module('app.services')
  .provider('$templates', function () {
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
       * @ngdoc method
       * @name ngSeed.services:templates.view
       * @param  {String} viewName The name of the view.
       * @return {String}          The path to the view.
       * @description 
       * Utility functions to get the path of a view.
       */
      function view (viewName) {
        console.log("$templates:",viewsPath+viewName+extension);
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
        
        setPath: function (path) {
          if ( typeof path !== 'string') {
            throw new Error('$templates: expecting a string for path.');
          }     

          if(path[path.length-1] !== '/') {
            path += '/';
          }

          viewsPath = path;
          partialsPath = viewsPath+'/partials';          

          console.log("$templates: path set to",viewsPath);
        },

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