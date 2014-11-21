define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module('cs_modal.services')
  .factory('ModalFactory',
    [
      '$modal',
      '$rootScope',
      function ( $modal, $rootScope ) {
        var modals = {};

        // @options|object
        //     resolve|object All of the initial values for the controller... these values will be thrown into the controller's $scope
        //     methods|object Add custom methods for the controller.. can't use next or close as those are reserved names.

        // @example
        // $scope.openModal = function() {
        //     var list = [];

        //     Helpers.modals.open(list, 'views/path/to/template.html', {
        //       resolve: {
        //         list: function() { return list; },
        //         checked: function() { return {}; }
        //       },
        //       methods: {
        //         add: function() {
        //           // really the only special "rule" for methods within the modal factory
        //           var $scope = this.$parent;

        //           if (this.form.$invalid) {
        //             // invalid!
        //           }

        //           var checked = _.values(_.pick($scope.checked, function (val) { return val !== "false"; }));
        //           checked = _.map(checked, function (c) { return parseInt(c, 10); })

        //           if (checked.length < 1) {
        //             Messenger.error('You must select something.');
        //             return;
        //           }

        //           save().then(function() {
        //             $scope.next(); // must be called in order to close / finish the modal!
        //           });
        //         }
        //       }
        //     },
        //     function (scope) {
        //       // this will be called once the modal closes/finishes...
        //     });
        // }

        modals.open = function ( obj, index, template, options, action ) {
          if (arguments.length < 5) {
            action   = options;
            options  = template;
            template = index;
            index    = 1;
          }

          var controller
            , args = ['$scope', '$modalInstance'];

          if ( !ng.isObject( options ) || !options.controller ) {
            if (!ng.isObject(options)) {
              options = {};
            }

            if (!ng.isObject(options.resolve)) {
              options.resolve = {};
            }

            options.resolve.obj = function() { return obj; };
            ng.forEach(options.resolve, function (fn, key) {
              args.push(key);
            });

            // the controller
            args.push(
              function ($scope, $modalInstance) {
                controller = this;

                // build resolved objects into the scope
                ng.forEach(arguments, function (val, key) {
                  if (key < 2) {
                    return true;
                  }

                  $scope[args[key]] = val;
                });

                if (ng.isObject(options.methods)) {
                  ng.forEach(options.methods, function (fn, method) {
                    $scope[method] = function() {
                      return fn.apply(this, Array.prototype.slice.call(arguments, 1));
                    };
                  });
                }

                $scope.next = function () {
                  $rootScope.modalActive = false;
                  $modalInstance.close($scope);
                };

                $scope.cancel = function () {
                  $modalInstance.dismiss( 'cancel' );
                };
              }
            );

          }

          $rootScope.modalActive = true;

          var modalInstance = $modal.open({
            templateUrl: template,
            resolve: options.resolve,
            controller: options.controller ? options.controller : args
          });

          modalInstance.result.then(function ( obj ) {
            if ( !options.controller ) {
              action( obj, index );
            } else {
              $rootScope.modalActive = false;
            }
          }, function () { });
        };

        return modals;

      }
    ]
  );
});
