define( ['angular', '../module'], function ( ng ) {
    'use strict';

    ng.module( 'cs_calendar.controllers' )
        .constant('CSCalendarConfig', {
            event: {
                bgColor: '#dff0d8',
                brColor: '#d6e9c6',
                txtColor: '#3c763d'
            },
            fnEvent: {
                bgColor: '#66FFFF',
                brColor: '#1CB4CF',
                txtColor: '#3c763d'
            }
        })
        .controller( 'CSCalendarController', [
            '$scope',
            'CSCalendarService',
            'CSCalendarConfig',
            '$modal',
            function ( $scope, service, config, $modal ) {

                /* config object */
                $scope.showCalendar = false;
                $scope.activeEvent = {};

                /* events source */
                $scope.events = [];
                $scope.eventsFn = [];

                /* event source that calls a function on every view switch */
                $scope.eventsF = function ( start, end, callback ) {
                    callback( service.createFnEvents( $scope.eventsFn, start, end ) );
                };


                /* action on eventClick */
                $scope.actionEventOnClick = function ( event, jsEvent ) {
                    $scope.$apply( $scope.onClickEvent( event ) );
                };

                /* action on Drop */
                $scope.actionOnDrop = function ( event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view ) {

                };

                /* action on Resize */
                $scope.actionOnResize = function ( event ) {

                };

                /* action on onMouseover */
                $scope.actionOnMouseover = function ( event, jsEvent, view ) {

                };

                /* action on Mouseout */
                $scope.actionOnMouseout = function ( event, jsEvent, view ) {

                };

                /* add custom event*/
                $scope.addEvent = function ( event ) {
                    var id = $scope.events.length + 'ev'
                      , newEvent = service.createEvent( event, config.event, id );

                    $scope.events.push( newEvent );
                };

                /* remove event */
                $scope.removeEvent = function ( event ) {
                    var index = $scope.events.indexOf( event );
                    if ( index >= 0 ) {
                        $scope.events.splice( index, 1 );
                    }
                };

                /* add fn event*/
                $scope.addFnEvent = function ( event ) {
                    var id = $scope.eventsFn.length + 'fn'
                      , newEvent = service.createEvent( event, config.fnEvent, id );

                    $scope.eventsFn.push( newEvent );
                };

                /* remove fn event */
                $scope.removeFnEvent = function ( event ) {
                    var index = $scope.eventsFn.indexOf( event );
                    if ( index >= 0 ) {
                        $scope.eventsFn.splice( index, 1 );
                    }
                };

                /* config object */
                $scope.uiConfig = {
                    calendar: {
                        height: 500,
                        editable: true,
                        header: {
                            left: 'basicDay basicWeek month',
                            center: 'title',
                            right: 'today prev,next'
                        },
                        eventClick: $scope.actionEventOnClick,
                        eventDrop: $scope.actionOnDrop,
                        eventResize: $scope.actionOnResize,
                        eventMouseover: $scope.actionOnMouseover,
                        eventMouseout: $scope.actionOnMouseout,
                        eventRender: function ( event, element ) {
                            element.find( '.fc-event-title' ).html( event.title );
                        }
                    }
                };

                /* get events*/
                $scope.getEvents = function() {
                    service.getEvents()
                        .then( function( events ) {
                            $scope.objEvents = events;
                            $scope.createEvents();
                        }, function( err ) {})
                };

                /* create events*/
                $scope.createEvents = function () {

                    $scope.objEvents.events.forEach( function ( event ) {
                        $scope.addEvent( event );
                    });

                    $scope.objEvents.fnEvents.forEach( function ( event ) {
                        $scope.addFnEvent( event );
                    });

                    $scope.eventSources = [ $scope.events, $scope.eventsF ];

                    $scope.showCalendar = true;
                };

                /* get filters*/
                $scope.getFilters = function () {
                    service.getFilters()
                        .then( function ( filters ) {
                            $scope.filters = filters;
                        }, function( err ) {});
                };

                $scope.getEvents();
                $scope.getFilters();

/* --------------------- add events section---------------------------------------------*/
                $scope.newEvent = function () {
                    $scope.event = {};

                    $scope.modalInstance = $modal.open( {
                        templateUrl: '/modules/cs_calendar/views/forms/calendar_add_event_form.html',
                        scope: $scope
                    } );
                };

                $scope.addOrUpdateEvent = function () {
                    if ( !$scope.editingEvent ) {
                        $scope.saveEvent();
                    } else {
                        $scope.updateEvent();
                    }
                    $scope.modalInstance.close();
                };

                $scope.saveEvent = function () {
                    service.save( $scope.event )
                        .then( function ( result ) {
                            $scope.event.editable = true;
                            $scope.addEvent( $scope.event );
                        }, function ( err ) {} );
                };

                $scope.close = function () {
                    $scope.modalInstance.close();
                };
/* --------------------- add events section---------------------------------------------*/

/* --------------------- remove events section---------------------------------------------*/

                $scope.onClickEvent = function( event ){
                    $scope.activeEvent = event.event.editable ? event : {} ;
                };

                $scope.delEvent = function(){
                    $scope.modalInstance = $modal.open( {
                        templateUrl: '/modules/cs_calendar/views/forms/calendar_confirm_delete_form.html',
                        scope: $scope
                    } );
                };

                $scope.confirm = function(){
                    console.log($scope.activeEvent)
                    $scope.removeEvent( $scope.activeEvent );
                    $scope.modalInstance.close();
                    $scope.activeEvent = {};
                };
/* --------------------- remove events section---------------------------------------------*/
            }
        ] );
} );