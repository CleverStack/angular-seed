define( ['angular'], function ( ng ) {
    'use strict';

    ng.module( 'cs_file_upload.controllers', [] );
    ng.module( 'cs_file_upload.directives', [] );
    ng.module( 'cs_file_upload.services', [] );

    var module = ng.module( 'cs_file_upload', [
        'cs_common',
        'cs_file_upload.controllers',
        'cs_file_upload.directives',
        'cs_file_upload.services'
    ] );

    module.config( [
        '$routeProvider',
        'CSTemplateProvider',
        'CSAccountHelpersProvider',
        function ( $routeProvider,
                   CSTemplate,
                   CSFileUploadHelpersProvider ) {

            CSFileUploadHelpersProvider.extend( 'CSCommonHelpers' );

            CSTemplate.setPath( '/modules/cs_file_upload/views' );

            $routeProvider
                .when( '/fileupload', {
                    templateUrl: CSTemplate.view( 'file_upload' ),
                    controller: 'CSFileUploadCtrl',
                    public: true
                } );
        }
    ] );

    return module;

} );
