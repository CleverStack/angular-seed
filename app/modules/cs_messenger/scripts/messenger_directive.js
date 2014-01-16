define(['angular', 'underscore', '../module'], function (ng, _) {
  'use strict';

  ng.module('cs_messenger.directives')
  .directive('messenger', [
      '$timeout',
      '$log',
      'Messenger',
      'CSTemplate',
      function ($timeout, $log, messenger, CSTemplate) {
        return {
          templateUrl: '/modules/cs_messenger/views/messenger.html',
          link: function ($scope, element) {

            var alertClass, appMessage, alertType, icon, textWrapper, closeButton, closingPromise;
            var allowedTypes = ['warning', 'error', 'success', 'info', 'loading'];
            var defaultType = 'warning';
            var icons = {
              warn: 'icon-warning-sign',
              warning: 'icon-warning-sign',
              error: 'icon-exclamation-sign',
              success: 'icon-ok',
              info: 'icon-info-sign',
              loading: 'icon-loading'
            };

            $timeout(function() {
              appMessage = element.find('#app_message');
              alertType = appMessage.find('.alert');
              icon = appMessage.find('p i');
              textWrapper = appMessage.find('p span');
              closeButton = appMessage.find('button.close');

              appMessage.hide();
            });

            $scope.$on('messenger:newMessage', function(event, data) {
              $timeout.cancel(closingPromise);
              $scope.message = data.message;
              $scope.type = data.type;

              if (_($scope.message).isEmpty() || $scope.type === 'close') {
                appMessage.hide();
                return;
              }

              if (!_(allowedTypes).contains($scope.type)) {
                $scope.type = defaultType;
              }

              alertClass = $scope.type === 'loading' ? 'info' : $scope.type;
              alertClass = $scope.type === 'error' ? 'danger' : $scope.type;

              $scope.opts = data.opts;
              if ($scope.type === 'loading') {
                $scope.opts = {
                  timeout: false,
                  close: false
                };
              }

              showMessage();

            });

            function showMessage() {
              if(_($scope.message).isUndefined() || _($scope.message).isEmpty()){
                $log.warn('Empty message received');
                return;
              }

              alertType.removeClass();
              alertType.addClass('alert');
              alertType.addClass('alert-' + alertClass);

              icon.removeClass();
              icon.addClass('pull-left');
              if ($scope.type === 'loading') {
                icon.addClass('icon-loading');
              } else {
                icon.addClass(icons[$scope.type]);
              }

              textWrapper.html($scope.message);

              if ($scope.opts.close) {
                closeButton
                  .unbind()
                  .show()
                  .click($scope.closeMessage);
              } else {
                closeButton
                  .unbind()
                  .hide();
              }

              appMessage.show();

              if ($scope.opts.timeout) {
                closingPromise = $timeout(function() {
                  appMessage.animate({height: 0, opacity: 0}, 1000, function() {
                    appMessage
                      .hide()
                      .css({opacity:1, height: 'auto'});
                  });
                }, $scope.opts.timeout, false);
              }
            }

            $scope.closeMessage = function() {
              appMessage.hide();
            };

          }
        };
      }
    ]
  );

});
