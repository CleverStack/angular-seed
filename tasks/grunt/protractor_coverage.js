module.exports = {
  config: {
    local: {
      options: {
        configFile:   '<%= appConfig.test.e2e.conf %>',
        keepAlive:    true,
        noColor:      false,
        coverageDir:  '<%= appConfig.test.e2e.instrumented.path %>',
        args: {
          baseUrl:    'http://localhost:<%= appConfig.test.e2e.coverage.port %>'
        }
      }
    }
  },
  register: function(grunt) {
    grunt.registerTask('test:e2e-coverage', 'Run an e2e test coverage report and server.', [
      'test:run-e2e-coverage',
      'open:coverageE2E',
      'connect:coverageE2EReport'
    ]);

    grunt.registerTask('test:run-e2e-coverage', 'Run an e2e test coverage report.', [
      'clean:coverageE2E',
      'copy:coverageE2E',
      'instrument',
      'connect:coverageE2E',
      'protractor_coverage',
      'makeReport'
    ]);
  }
};
