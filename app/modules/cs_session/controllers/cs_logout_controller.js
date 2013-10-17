define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_session.controllers')
  .controller('CSLogoutController', [
    'CSSession',
    function (CSSessionProvider) {
      CSSessionProvider.logout();

    }
  ]);

});
