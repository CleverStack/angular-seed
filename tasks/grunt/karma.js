module.exports = {
  config: {
    unit: {
      configFile:     '<%= appConfig.test.unit.conf %>',
      autoWatch:      false,
      singleRun:      true
    },
    unitAuto: {
      configFile:     '<%= appConfig.test.unit.conf %>',
      autoWatch:      true,
      singleRun:      false
    },
    unitCoverage: {
      configFile:     '<%= appConfig.test.unit.conf %>',
      autoWatch:      false,
      singleRun:      true,
      reporters:      [ 'progress', 'coverage' ],
      preprocessors: {
        './app/modules/**/*.js': [ 'coverage' ]
      },
      coverageReporter: {
        type:         'html',
        dir:          '<%= appConfig.test.unit.coverage.path %>'
      }
    },
    travis: {
      configFile:     '<%= appConfig.test.unit.conf %>',
      autoWatch:      false,
      singleRun:      true,
      browsers:       [ 'PhantomJS' ]
    }
  },
  register: function(grunt) {
    grunt.registerTask('test:unit', 'Single run of unit tests.', [
      'karma:unit'
    ]);

    grunt.registerTask('autotest:unit', 'Start up the auto unit test server.', [
      'karma:unitAuto',
      'watch:unitTests'
    ]);

    grunt.registerTask('test:travis', 'Single run of unit tests for Travis CI.', [
      'karma:travis'
    ]);

    grunt.registerTask('test:unit-coverage', 'Run a unit test coverage report and server.', [
      'test:run-unit-coverage',
      'connect:coverage'
    ]);

    grunt.registerTask('test:run-unit-coverage', 'Run a unit test coverage report.', [
      'clean:coverage',
      'karma:unitCoverage',
      'open:coverage'
    ]);
  }
};
