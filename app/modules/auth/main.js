define([
  
  './module',


  // Helpers
  './providers/AuthHelpersProvider',

  // Providers
  './providers/SessionProvider',
  './providers/AccountProvider',

  './models/AccountModel',
  './models/UserModel',

  // Services
  './services/SessionService',
  './services/AccountService',
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
  './controllers/AccountChooserController',

  // Directives
  './directives/AccountChooserDirective'


], function() {

});
