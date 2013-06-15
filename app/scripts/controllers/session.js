'use strict';

var app = angular.module('app');

/**
 * Session Controller
 *
 * It handles routing for login/logout.
 */
app.controller('SessionCtrl',
  ['$scope', '$location', '$route', '$timeout', 'authService', 'SessionService',
  function( $scope, $location, $route, $timeout, authService, SessionService ) {

  /**
   * Initial credentials.
   * @type {Object}
   */ 
  $scope.credentials = {};

  /**
   * Warning flag. Meant to hide/show errors in the form.
   * @type {Boolean}
   */
  $scope.showWarning = false;

  /**
   * Binding to auth-loginRequired event.
   *
   * This event can be triggered from anywhere in the app to ensure
   * that the user gets redirected to the login page.
   * @return {Redirect} To /login
   */
  $scope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
  });

  /**
   * Binding to the auth-loginConfirmed event.
   *
   * This event will be triggered after login.
   * @param  {Object} data The response from the server
   * @return {Redirect}      To be defined by user.
   */
  $scope.$on('event:auth-loginConfirmed', function (data) {
    // Redirect to the appropriate place
    console.log("confirmed login");
    $location.path('/dashboard');
  });

  /**
   * Binding to route changes.
   *
   * Check if the route is not being changed to the logout route.
   * If it's not, then get the session from the SessionService and
   * make sure the user is still logged in.
   */
  $scope.$on('$routeChangeStart', function(next, current) {
    if(!/logout/.test($location.path())) {
      SessionService.getSession().then(function (res) {
        $scope.session = {
          raw: res,
          status: res.data ? 200 : 401,
          user: res.data || null
        }
      });
    }
  });

  /**
   * Should be added to the ng-change attribute of an input
   * field in a login form.
   * @param  {Event} $event the event object.
   * @return {Boolean}        false if they key is not enter, otherwise returns
   *                          whatever doLogin returns.
   */
  $scope.loginOnEnter = function ($event) {
    if($event.which === 13) return $scope.doLogin();
    return false;
  }

  /**
   * Example login function. It should call authService.loginConfirmed()
   * once it's successfully done.
   */
  $scope.doLogin = function() {
    var status = false;
    if ( $scope.credentials.length ) {
      $scope.showWarning = false;
      $scope.waitForResponse = true;
      var timeoutTime = function () {
        $scope.showWarning = true;
        $scope.waitForResponse = false;
      };
      $timeout(timeoutTime, 1500);

      SessionService.login( $scope.credentials )
        .success(function (data, status, headers, config) {
          if(data.status === 401) {
            $scope.warningMessage = data.message;
            $scope.waitForResponse = false;
            $scope.showWarning = true;
            return;
          }

          if(data.status === 200) {
            $scope.session = {
              raw: data,
              status: data.status,
              user: data.user
            };
            console.log("SessionService@doLogin OK:", $scope.session);
            status = true;
            authService.loginConfirmed();
          }

      });
    } else {
      $scope.showWarning = true;
      $scope.warningMessage = "Email and Password required."
    }
    return status;
  };

  /**
   * Example logout function.
   */
  $scope.doLogout = function () {
    SessionService.logout()
      .success(function (data, status, headers, config) {
        console.log('Logout successful', $scope.session);
        $scope.session.user = null;
        $location.path('/');
    }).error(function (data, status, headers, config) {
        console.error('Failed logout');
    });
  };

  /**
   * This is a sample logout/session checking routine.
   */
  if(/logout/.test($location.path())) {
    console.log("logging out");
    $scope.doLogout();
  } else {
    // Get the session
    SessionService.getSession()
      .then(function (res) {
        $scope.session = {
          raw: res,
          status: res.data ? 200 : 401,
          user: res.data || {}
        };

        console.log("SessionCtrl: Res", res);
        console.log("SessionCtrl: Session", $scope.session);

        if($scope.session.user.role) {
          if( /login/.test($location.path()) ||
              /signup/.test($location.path()) )  {
            $scope.$broadcast('event:auth-loginConfirmed');
          }
        }
      });
  }
}]);