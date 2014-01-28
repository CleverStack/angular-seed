define( ['angular', '../module'], function ( ng ) {
    'use strict';

    ng.module( 'cs_file_upload.controllers' )
        .controller( 'CSFileUploadCtrl', [
            '$scope',
            '$rootScope',
            'CSFileUploadService',
            function ( $scope, $rootScope, service) {

//--------------- upload on Inc section --------------------------------------------------

                $scope.getOptions = function ( callback ) {

                    var options = {};

                    options.fpOptions = {
                        mimetypes: [ 'image/*' ],
                        services: [ 'COMPUTER' ],
                        openTo: 'COMPUTER',
                        maxSize: 1024 * 1024 * 3,
                        container: 'modal'
                    };

                    options.uploadSuccess = function ( fpFile ) {
                        callback ( fpFile );
                    };

                    return options;
                };

//--------------- upload on Inc section end --------------------------------------------------

//--------------- common section ---------------------------------------------------

                $scope.filesForAccount = [];
                $scope.filesForUser = [];

                $scope.initData = function( userid ) {
                    $scope.updatedFile = {};
                    service.list();
                    service.listForUser( userid );
                };

                $scope.save = function ( files ) {
                    service.save( files );
                };

                $scope.preUpdate = function ( file ) {
                    $scope.updatedFile = file;
                };

                $scope.update = function ( file ) {

                    service.deleteFromInk( $scope.updatedFile.url );

                    $scope.updatedFile.name = file[0].filename;
                    $scope.updatedFile.type = file[0].mimetype;
                    $scope.updatedFile.url = file[0].url;
                    $scope.updatedFile.size = file[0].size;
                    $scope.updatedFile.lastModified = new Date();

                    service.update( $scope.updatedFile );
                };

                $scope.delete = function ( file ) {
                    service.delete( file );
                };

                $scope.download = function ( files ) {
                    service.downloadFromInk( files );
                };

                $rootScope.$on( 'fileUpload: listFiles', function( event, data ) {
                    $scope.filesForAccount = data;
                });

                $rootScope.$on( 'fileUpload: listFilesForUser', function( event, data ) {
                    $scope.filesForUser = data;
                });

                $rootScope.$on( 'fileUpload: saveFiles', function( event, data ) {
                    $scope.initData( 1 );
                });

                $rootScope.$on( 'fileUpload: updateFile', function( event, data ) {
                    $scope.initData( 1 );
                });

                $rootScope.$on( 'fileUpload: deleteFile', function( event, data ) {
                    $scope.initData( 1 );
                });

                $scope.initData( 1 );

//--------------- common section end ---------------------------------------------------

            }
        ] );
} );
