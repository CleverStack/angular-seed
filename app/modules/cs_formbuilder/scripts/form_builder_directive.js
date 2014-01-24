define(['angular', 'application'], function (ng) {
  'use strict';

  /**
   * using directive
   *
   *  <form-builder form="{ formFields }" ok="{ ok-function }" cancel="{ cancel-function }"></form-builder>
   *
   */
  ng.module('cs_formbuilder.directives')
    .directive('formBuilder', [
      'CSTemplate',
      function (t) {
        return {
          templateUrl: '/modules/cs_formbuilder/views/form/form-builder-template.html',
          restrict: 'E',
          scope: {
            fields: '=',
            ok: '&',
            cancel: '&',
            button: '@',
            require: '@',
            loaded: '='
          }
        };
      }
    ])
    .directive('formBuilderField', [
      '$http',
      '$compile',
      'CSTemplate',
      '$rootScope',
      function ($http, $compile, t, $rootScope) {

        var getTemplateUrl = function (field) {
          var type = field.type
            , templateUrl = '';

          switch (type) {
            case 'text':
              templateUrl = '/modules/cs_formbuilder/views/fields/form-field-text.html';
              break;
            case 'date':
              templateUrl = '/modules/cs_formbuilder/views/fields/form-field-date.html';
              break;
            case 'select':
              templateUrl = '/modules/cs_formbuilder/views/fields/form-field-select.html';
              break;
            case 'dropdown-select':
              templateUrl = '/modules/cs_formbuilder/views/fields/form-field-dropdown-select.html';
              break;
          }

          return templateUrl;
        };

        var linker = function(scope, element, attrs) {
          element.hide();
          scope.rootScope = $rootScope;
          var templateUrl = getTemplateUrl(scope.field);

          $http.get(templateUrl).success(function(data) {
            element.html(data);
            $compile(element.contents())(scope);
            element.show();
          });
        };

        return {
          template: '{{ field }}',
          restrict: 'E',
          scope: {
            field: '='
          },
          link: linker
        };
      }
    ]);
});
