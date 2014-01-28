define( ['angular', 'filepicker', '../module'], function ( ng, fp ) {
    'use strict';

    ng.module( 'cs_file_upload.services' )
        .service( 'CSFileUploadService', [
            '$http',
            '$log',
            '$rootScope',
            'config',
            function ( $http, $log, $rootScope, config ) {

                fp.setKey( config.filepickerKey );

                var formatData = function ( data ) {
                    return {
                        id: data.id || null,
                        name: data.filename,
                        type: data.mimetype,
                        url: data.url,
                        size: data.size
                    }
                };

                return {

                    list: function() {

                        $http.get( '/files' )
                            .success(function( data, status ){

                                data.lastModified = data.lastModified instanceof Date
                                    ? data.lastModified
                                    : new Date( data.lastModified );

                                $rootScope.$broadcast( 'fileUpload: listFiles', data );
                            })
                            .error(function( err ){
                                $log.warn( 'File Upload: ERROR: ' + err.error );
                            });
                    },

                    listForUser: function( userid ) {

                        $http.get( '/files/?userId=' + userid )
                            .success(function( data, status ){

                                data.lastModified = data.lastModified instanceof Date
                                    ? data.lastModified
                                    : new Date( data.lastModified );

                                $rootScope.$broadcast( 'fileUpload: listFilesForUser', data );
                            })
                            .error(function( err ){
                                $log.warn( 'File Upload: ERROR: ' + err.error );
                            });
                    },

                    save: function( files ) {

                        if ( !!files && !!files.length ){
                            var data = files.map( function( f ) { return formatData( f ) } );

                            $http.post( '/files', data )
                                .success(function( data, status ){
                                    $rootScope.$broadcast( 'fileUpload: saveFiles', data );
                                })
                                .error(function( err ){
                                    $log.warn( 'File Upload: ERROR: ' + err.error );
                                });
                        } else {
                            $log.warn( 'File Upload: Insufficient data' );
                        }
                    },

                    update: function( file ) {

                        if ( !!file && !!file.id ){

                            $http.put( '/files/' + file.id, file )
                                .success(function( data, status ){
                                    $rootScope.$broadcast( 'fileUpload: updateFile', data );
                                })
                                .error(function( err ){
                                    $log.warn( 'File Upload: ERROR: ' + err.error );
                                });
                        } else {
                            $log.warn( 'File Upload: Insufficient data' );
                        }
                    },

                    delete: function( file ) {
                        var self = this;

                        if ( !!file.id ){
                            $http.delete( '/files/' + file.id )
                                .success(function( data, status ){
                                    self.deleteFromInk( file.url );
                                    $rootScope.$broadcast( 'fileUpload: deleteFile' );
                                })
                                .error(function( err ){
                                    $log.warn( 'File Upload: ERROR: ' + err.error );
                                });
                        } else {
                            $log.warn( 'File Upload: Insufficient data' );
                        }
                    },

                    deleteFromInk: function( url ) {

                        var onSuccess = function() {
                            $log.info( 'File Upload: file have been removed from Ink' );
                        };

                        var onError = function( err ){
                            $log.warn( 'File Upload: Ink error: ' + err );
                        };

                        fp.remove( { url: url }, onSuccess, onError );
                    },

                    downloadFromInk: function( file ) {

                        var options = {
                            services: [ 'COMPUTER' ],
                            openTo: 'COMPUTER',
                            container: 'modal',
                            suggestedFilename: file.name
                        };

                        var onSuccess = function() {
                            $log.info( 'File Upload: file have been dowloaded from Ink' );
                        };

                        var onError = function( err ){
                            $log.warn( 'File Upload: Ink error: ' + err );
                        };

                        fp.export( file.url, options, onSuccess, onError );
                    }
                };
            }
        ] );
} );