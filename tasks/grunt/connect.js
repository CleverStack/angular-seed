var utils      = require('utils')
  , lrSnippet  = require('grunt-contrib-livereload/lib/utils').livereloadSnippet
  , appConfig  = require('config');

module.exports = {
  options: {
    port:           '<%= appConfig.dev.port %>',
    hostname:       '<%= appConfig.dev.hostname %>',
    livereload:     '<%= appConfig.dev.liveReloadPort %>'
  },
  livereload: {
    options: {
      middleware:   function( connect ) {
        return [
          lrSnippet,
          utils.helpers.mountFolder( connect, '.tmp' ),
          utils.helpers.mountFolder( connect, appConfig.dev.path ),
          utils.helpers.fallbackToIndex( connect, 'app/index.html', '/index.html' )
        ];
      }
    }
  },
  dist: {
    options: {
      livereload:   false,
      port:         '<%= appConfig.dist.port %>',
      base:         '<%= appConfig.dist.path %>',
      middleware:   function( connect ) {
        return [
          connect.compress(),
          utils.helpers.mountFolder( connect, appConfig.dist.path ),
          utils.helpers.fallbackToIndex( connect, appConfig.dist.path + '/index.html', '/index.html' )
        ];
      }
    }
  },
  coverage: {
    options: {
      base:         '<%= appConfig.test.unit.coverage.path %>',
      directory:    '<%= appConfig.test.unit.coverage.path %>',
      port:         '<%= appConfig.test.unit.coverage.port %>',
      keepalive:    true,
      livereload:   false
    }
  },
  coverageE2E: {
    options: {
      port:         '<%= appConfig.test.e2e.coverage.port %>',
      middleware:   function( connect ) {
        return [
          utils.helpers.mountFolder( connect, appConfig.test.e2e.instrumented.path + 'app' ),
          utils.helpers.fallbackToIndex( connect, appConfig.test.e2e.instrumented.path + 'app/index.html', '/index.html' )
        ];
      },
      livereload:   false,
      debug:        false
    }
  },
  coverageE2EReport: {
    options: {
      port:         '<%= appConfig.test.e2e.report.port %>',
      middleware:   function( connect ) {
        return [
          utils.helpers.mountFolder( connect, appConfig.test.e2e.coverage.path + '/reports' ),
          utils.helpers.fallbackToIndex( connect, appConfig.test.e2e.coverage.path + 'reports/index.html', '/index.html' )
        ];
      },
      keepalive:    true,
      livereload:   false
    }
  },
  coverageE2EReportNoWait: {
    options: {
      port:         '<%= appConfig.test.e2e.report.port %>',
      middleware:   function( connect ) {
        return [
          utils.helpers.mountFolder( connect, appConfig.test.e2e.coverage.path + '/reports' ),
          utils.helpers.fallbackToIndex( connect, appConfig.test.e2e.coverage.path + 'reports/index.html', '/index.html' )
        ];
      },
      keepalive:    false,
      livereload:   false
    }
  }
}
