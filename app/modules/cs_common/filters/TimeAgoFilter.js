define( [ 'angular', 'moment', '../module' ], function( ng, moment ) {
  'use strict';

  ng
    .module( 'cs_common.filters' )
    .filter( 'timeAgo', [
      '$log',
      function( $log ) {
        return function( date ) {
          var dt = moment( date );
          if( !dt.isValid() ){
            $log.warn( 'timeAgoFilter: Invalid date input' );
            return date;
          }

          return dt.fromNow();

        };
      }
    ]);

});
