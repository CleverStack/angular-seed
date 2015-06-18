define([

  './module',

  // Helpers
  './providers/AuthHelpersProvider',

  // Providers
  './providers/SessionProvider',

  './models/UserModel',

  // Services
  './services/SessionService',
  './services/UserService',

  // Filters
  './filters/LastLoginFilter',

  // Controllers
  './controllers/SignUpController',
  './controllers/SignInController',
  './controllers/SignOutController',
  './controllers/UsersListController',
  './controllers/UserEditController',
  './controllers/PasswordResetRequestController',
  './controllers/PasswordResetSubmitController',
  './controllers/SignUpConfirmController',

  // Directives


], function() {

});
