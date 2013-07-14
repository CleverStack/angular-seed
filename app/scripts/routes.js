
var app = angular.module('app');

app.config(
  ['$routeProvider', '$locationProvider', '$httpProvider',
  function ($routeProvider, $locationProvider, $httpProvider) {
  
  'use strict';

  $httpProvider.defaults.withCredentials = true;

  var views = 'views/';
  var partials = 'views/partials/';

  /**
   * @ngdoc method
   * @name ngSeed.routes:view
   * @param  {String} viewName The name of the view.
   * @return {String}          The path to the view.
   * @description 
   * Utility functions to get the path of a view.
   */
  function view (viewName) {
    return views+viewName+'.html';
  }

  /**
   * @ngdoc method
   * @name ngSeed.routes:partial
   * @param  {String} section The folder path to look into.
   * @param  {String} partialName The name of the partial.
   * @return {String}          The path to the partial.
   * @description 
   * Utility functions to get the path of a partial.
   */
  function partial (section, partialName) {
    var url;
    if(partialName === undefined) {
      url = partials+section;
    } else {
      url = section+'/partials/'+partialName;
    }
    url += '.html';
    return url;
  }

  $locationProvider.html5Mode( true );

  $routeProvider
    .when('/', {
      templateUrl: view('home'),
      controller: 'HomeCtrl'
    })
    .when('/error', {
      templateUrl: partial('error')
    })
    .otherwise({
      redirectTo: '/'
    });

}]);