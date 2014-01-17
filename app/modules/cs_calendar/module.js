define( ['angular'], function ( ng ) {
    'use strict';

    ng.module( 'cs_calendar.controllers', [] );
    ng.module( 'cs_calendar.services', [] );

    var module = ng.module( 'cs_calendar', [
        'cs_common',
        'cs_calendar.controllers',
        'cs_calendar.services',
        'ui.calendar'
    ] );

    module.config( [
        '$routeProvider',
        'CSTemplateProvider',
        function ( $routeProvider, CSTemplate ) {

            CSTemplate.setPath( '/modules/cs_calendar/views' );

            $routeProvider
                .when( '/calendar', {
                    templateUrl: CSTemplate.view( 'calendar' ),
                    controller: 'CSCalendarController',
                    public: true
                } );
        }

    ] );

    return module;
} );