define( ['angular', '../module'], function ( ng ) {
    'use strict';

    ng.module( 'cs_calendar.services' )
        .service( 'CSCalendarService', [
            '$http',
            '$q',
            function ( $http, $q ) {

                return {

                    getCurrentDate: function() {
                        return {
                            date: new Date(),
                            d: new Date().getDate(),
                            m: new Date().getMonth(),
                            y: new Date().getFullYear()
                        }
                    },

                    createEvent: function( event, config, id ) {
                        return {
                            id:                 id,
                            title:              '<strong>' + event.name + '</strong>' + ' / ' + event.note,
                            start:              ng.isDate( event.start ) ? event.start : new Date( event.start ),
                            end:                ng.isDate( event.end ) ? event.end : new Date( event.end ),
                            editable:           event.editable,
                            backgroundColor:    config.bgColor,
                            borderColor:        config.brColor,
                            textColor:          config.txtColor,
                            event:              event
                        }
                    },

                    createFnEvents: function( events, start, end ) {
                        start = new Date( start );
                        end = new Date( end );

                        var fullEvents = [];

                        events.forEach( function( event ) {
                            var startEvent = new Date( event.event.start )
                              , endEvent = new Date( event.event.end )
                              , fromH = new Date( event.event.from ).getHours()
                              , fromM = new Date( event.event.from ).getMinutes()
                              , toH = new Date( event.event.to ).getHours()
                              , toM = new Date( event.event.to ).getMinutes()
                              , p = event.event.period;

                            for ( var l = startEvent; l<=end; l = new Date( l.getFullYear() + p.y, l.getMonth() + p.m, l.getDate() + p.d ) ){

                                if ( l >= start && l <= endEvent ){
                                    var newEvent = ng.copy( event );

                                    newEvent.id = event.id + 'c';
                                    newEvent.start = new Date( l.getFullYear(), l.getMonth(), l.getDate(), fromH, fromM );
                                    newEvent.end = new Date( l.getFullYear(), l.getMonth(), l.getDate(), toH, toM );

                                    fullEvents.push( newEvent )
                                }
                            }
                        });

                        return fullEvents;
                    },

                    getEvents: function () {
                        var deferred = $q.defer();

                        var events = [
                            {
                                name: 'events #1',
                                note: 'note for events #1',
                                start: new Date().toString(),
                                end: new Date().toString(),
                                editable: true
                            },
                            {
                                name: 'events #2',
                                note: 'note for events #2',
                                start: new Date().toString(),
                                end: new Date().toString(),
                                editable: true
                            }
                        ];

                        var fnEvents = [
                            {
                                name: 'periodic events #1',
                                note: 'note for periodic events #1',
                                start: new Date().toString(),
                                end: new Date(2014, 2, 1).toString(),
                                from: new Date(0, 0, 1, 11, 0).toString(),
                                to: new Date(0, 0, 1, 13, 0).toString(),
                                editable: false,
                                period: { y:0, m:0, d: 1 }
                            },
                            {
                                name: 'periodic events #2',
                                note: 'note for periodic events #2',
                                start: new Date().toString(),
                                end: new Date(2015, 5, 25).toString(),
                                from: new Date( 0, 0, 1, 11, 0).toString(),
                                to: new Date( 0, 0, 1, 13, 0).toString(),
                                editable: false,
                                period: { y:0, m:0, d: 15 }
                            }
                        ];

                        deferred.resolve( { events: events, fnEvents: fnEvents } );

                        return deferred.promise;
                    },

                    getFilters: function () {
                        var deferred = $q.defer();

                        var filters = {
                            filterOpt1: { name: 'Filter option #1', data: [] },
                            filterOpt2: { name: 'Filter option #2', data: [] },
                            filterOpt3: { name: 'Filter option #3', data: [] }
                        };

                        deferred.resolve( filters );

                        return deferred.promise;
                    },

                    save: function( event ){
                        var deferred = $q.defer();

                        deferred.resolve( /*return obj*/ );

                        return deferred.promise;
                    },

                    data: {}

                };
            }
        ] );
} );