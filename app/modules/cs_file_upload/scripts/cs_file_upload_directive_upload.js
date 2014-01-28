define( ['angular', 'filepicker', '../module' ], function ( ng, fp ) {
    'use strict';

    angular
        .module( 'cs_file_upload.directives' )
        .directive( 'uploader',
            [
                'config',
                '$log',
                function ( config, $log ) {
                    return {
                        require: '?ngModel',
                        link: function ( $scope, $element, $attrs, ngModelCtrl ) {
                            var fpOptions = {
                                mimetypes: config.mimetypes,
                                services: $attrs.multiple ? config.servicesForMultiplePick : config.servicesForPick,
                                openTo: config.openTo,
                                maxSize: config.maxSize,
                                container: 'modal'
                            };

                            var options = $scope.$eval( $attrs.uploader );

                            fpOptions = angular.extend( {}, fpOptions, options.fpOptions );

                            fp.setKey( config.filepickerKey );

                            function onFilepickerSuccess( fpFiles ) {

                                if ( !$attrs.multiple ) {
                                    fpFiles = [ fpFiles ];
                                }

                                var files = [];

                                for ( var i; i < fpFiles.length; i++ ){

                                }

                                fpFiles.forEach( function( fpFile ) {
                                    fp.stat( fpFile, {}, function ( metadata ) {
                                        fpFile = angular.extend( fpFile, metadata );
                                    } );
                                });

                                if ( angular.isFunction( options.uploadSuccess ) ) {
                                    $scope.$apply( function () {
                                        options.uploadSuccess( fpFiles );
                                    } );
                                }

                            }

                            function onFilepickerError( fpError ) {
                                $log.error( fpError.toString() );
                            }

                            $element.bind( 'click', function () {
                                if ( !!$attrs.multiple ) {
                                    fp.pickMultiple( fpOptions, onFilepickerSuccess, onFilepickerError );
                                } else {
                                    fp.pick( fpOptions, onFilepickerSuccess, onFilepickerError );
                                }

                            });
                        }
                    };
                }
            ]
        );
} );