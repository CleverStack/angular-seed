/**
 * @file Instantiates and configures angular modules for your module.
 */
define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_modal.services', []);

  var module = ng.module('cs_modal', [
    'cs_common',
    'cs_modal.services',
    'ui.bootstrap'
  ]);

  module.config(['$provide', function ($provide) {
    // Override angular-ui-bootstrap template location
    var angularBootstrapDirectives = [
      'modalBackdrop',
      'modalWindow'
    ];

    for( var i = 0; i < angularBootstrapDirectives.length; i++ ) {
      $provide.decorator(angularBootstrapDirectives[i]+'Directive', function($delegate) {
        $delegate[0].templateUrl = ['modules/cs_modal/views/', $delegate[0].name, '.html'].join('');
        return $delegate;
      });
    }
  }]);
  
  return module;
});
