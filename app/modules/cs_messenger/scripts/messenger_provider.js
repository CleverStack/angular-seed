define(['angular', '../module'], function (ng) {
  'use strict';

  ng
  .module('cs_messenger.services')
  .factory('Messenger',
    [
      '$rootScope',
      function ($rootScope) {
        var mService = {};
        var defaultOpts = {
          timeout: 6000,  // mixed (miliseconds or false for no timeout)
          close: true     // boolean - whether the message should have a close button
        };

        var notify = function(message, type, opts){
          opts = opts ? ng.extend(ng.copy(defaultOpts), opts) : ng.copy(defaultOpts);
          $rootScope.$broadcast('messenger:newMessage', {type: type, message: message, opts: opts});
        };

        mService.error = function(msg, opts){ return notify(msg, 'error', opts); };
        mService.warning = function(msg, opts){ return notify(msg, 'warning', opts); };
        mService.warn = mService.warning;
        mService.success = function(msg, opts){ return notify(msg, 'success', opts); };
        mService.info = function(msg, opts){ return notify(msg, 'info', opts); };
        mService.loading = function(msg, opts){ return notify(msg, 'loading', opts); };
        mService.loader = mService.load = mService.loading;
        mService.close = function(){ return notify('', 'close'); };

        return mService;
      }
    ]
  );

});
