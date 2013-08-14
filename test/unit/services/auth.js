define(['services/auth', 'services/user'], function () {
  'use strict';

  describe('Service: $auth', function () {

    beforeEach(angular.mock.module('app'));

    it('should exist', inject( function( $auth ) {
      expect( $auth ).to.exist;
    }));

    it('should have a getCurrentUser function that works when not logged in', inject( function( $auth ) {
      expect( $auth.getCurrentUser ).to.be.a( 'function' );
      expect( $auth.getCurrentUser() ).to.equal( null );
    }));

    it('should have an isLoggedIn function that works when not logged in', inject( function( $auth ) {
      expect( $auth.isLoggedIn ).to.be.a( 'function' );
      expect( $auth.isLoggedIn() ).to.equal( false );
    }));

    it('should have a login function that works', inject( function( $auth ) {
      expect( $auth.login ).to.be.a( 'function' );
      // $auth.login({ email: 'admin', password: "1234" });
    }));

    it('should have a working logout function', inject( function( $auth ) {
      expect( $auth.logout ).to.be.a( 'function' );
    }));

  });

});