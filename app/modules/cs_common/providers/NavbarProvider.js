define( [ 'angular', 'underscore', '../module' ], function( ng, _ ) {
  'use strict';

  ng
  .module( 'cs_common.providers' )
  .provider( 'Navbar', [
    function () {

      var Navbar = {
        left:   [],
        right:  [],
        app:    []
      };

      /**
       * @description
       * The actual service.
       */
      return {
        $get: [
          '$injector',
          function() {
            return {
              getNavbar: function() {
                return Navbar;
              }
            };
          }
        ],

        /**
         * @ngdoc function
         * @methodOf cleverStackNgSeed.providers:NavbarProvider
         * @name setTemplate
         * @param  {String} theTemplate the template you want to use
         */
        setNavbar: function( navbar ) {
          Navbar = navbar;
        },

        getNavbar: function() {
          return Navbar;
        },

        extend: function( navbarItems ) {
          if ( !ng.isObject( navbarItems ) ) {
            throw new Error( 'NavbarProvider: extend method expects an object (your menu structure for your navbar)' );
          }

          Object.keys( navbarItems ).forEach( function( position ) {
            Navbar[ position ] = _.union( ( Navbar[ position ] || [] ), navbarItems[ position ] );
          });
        }

      };

    }

  ]);

});
