module.exports = {
  config: {
    options: {
      configFile:     '<%= appConfig.test.e2e.conf %>',
      args: {
        seleniumPort: '<%= appConfig.test.e2e.seleniumPort %>'
      }
    },
    singlerun: {
      keepAlive:      false
    },
    auto: {
      keepAlive:      true
    }
  },
  register: function(grunt) {
    grunt.registerTask('test:e2e', 'Single run of end to end (e2e) tests using protractor.', [
      'connect:livereload',
      'protractor:singlerun'
    ]);

    grunt.registerTask('autotest:e2e', 'Start up the auto end to end (e2e) test server using protractor.', [
      'connect:livereload',
      'protractor:auto',
      'watch:e2eTests'
    ]);

    grunt.registerTask('test', 'Run both unit and e2e tests', [
      'test:unit',
      'test:e2e'
    ]);

    grunt.registerTask('test:coverage', 'Run a unit test coverage report.', [
      'test:run-e2e-coverage',
      'open:coverageE2E',
      'connect:coverageE2EReportNoWait',
      'test:unit-coverage'
    ]);
  }
};
