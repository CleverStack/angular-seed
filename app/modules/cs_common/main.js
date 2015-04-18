define([
  'angular',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'jqueryMinicolors',

  './module',

  // Providers
  './providers/HelpersProvider',
  './providers/TemplateProvider',
  './providers/HttpOptionsProvider',
  './providers/NavbarProvider',
  './providers/ResourceFactoryProvider',

  // Directives
  './directives/ColorPickerDirective',
  './directives/FocusedOnDirective',
  './directives/LoadingDirective',
  './directives/MustBeEqualToDirective',
  './directives/NavbarDirective',
  './directives/NgBlurDirective',
  './directives/NgFocusDirective',
  './directives/StringToNumberDirective',
  './directives/WarnUnsavedChangesDirective',

  // Controllers
  './controllers/NavbarController',

  // Filters
  './filters/StartsWithFilter',
  './filters/TimeAgoFilter',
  './filters/CapitalizeFilter'

], function() {});
