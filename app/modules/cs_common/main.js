define([
  'angular',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',

  './module',

  // Providers
  './scripts/cs_common_helpers_provider',
  './scripts/cs_template_provider',
  './scripts/cs_http_options_provider',

  'http-auth-interceptor',

  // Directives
  './scripts/string_to_number',
  './scripts/must_equal_to',

  // Filters
  './scripts/starts_with',

  // Services
  './scripts/cs_browser_detect',
  './scripts/cs_resource_factory'
], function(){});
