define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_formbuilder.directives', []);

  var module = ng.module('cs_formbuilder', [
    'cs_common',
    'ui.bootstrap',
    'cs_formbuilder.directives'
  ]);

  module.config(['$provide', function ($provide) {
    var angularBootstrapDirectives = [
      'datepicker',
      'datepickerPopupWrap'
    ];

    for (var i = 0; i < angularBootstrapDirectives.length; i++) {
      $provide.decorator(angularBootstrapDirectives[i]+'Directive', function ($delegate) {
        $delegate[0].templateUrl = ['modules/cs_formbuilder/views/', $delegate[0].name, '.html'].join('');
        return $delegate;
      });
    }

  }]);

  return module;
});
