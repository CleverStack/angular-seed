module.exports = {
  config: {
    wbDriverUpdate: {
      args: [ './node_modules/protractor/bin/webdriver-manager', 'update', '--out_dir=./scripts/' ],
      options: {
        passArgs: [
          'ie',
          'chrome',
          'standalone',
          'seleniumPort'
        ]
      }
    },
    wbDriverStatus: {
      args: [ './node_modules/protractor/bin/webdriver-manager', 'status' ],
      options: {
        passArgs: [
          'ie',
          'chrome',
          'standalone',
          'seleniumPort'
        ]
      }
    },
    wbDriverStart: {
      args: [ './node_modules/protractor/bin/webdriver-manager', 'start', '--out_dir=./scripts/' ],
      options: {
        passArgs: [
          'ie',
          'chrome',
          'standalone',
          'seleniumPort'
        ]
      }
    }
  },
  register: function(grunt) {
    grunt.registerTask( 'webdriver', [
      'run:wbDriverStatus',
      'run:wbDriverUpdate'
    ]);

    grunt.registerTask( 'webdriver:update', [
      'run:wbDriverUpdate'
    ]);

    grunt.registerTask( 'webdriver:status', [
      'run:wbDriverStatus'
    ]);

    grunt.registerTask( 'webdriver:start', [
      'run:wbDriverStart'
    ]);
  }
};
