module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',
    // frameworks to use
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'app/components/chai/chai.js',
      'app/components/sinon/lib/sinon.js',
      'app/components/angular-unstable/angular.js',
      'app/components/angular-resource-unstable/angular-resource.js',
      'app/components/angular-mocks/angular-mocks.js',
      'app/components/angular-http-auth/src/http-auth-interceptor.js',
      'app/components/underscore/underscore.js',
      'app/scripts/init.js',
      'app/scripts/routes.js',
      'app/scripts/directives/*.js',
      'app/scripts/services/*.js',
      'app/scripts/filters/*.js',
      'app/scripts/controllers/*.js',
      'test/unit/**/*.js'
    ],
    // list of files to exclude
    exclude: [
    ],

    browsers: ['Chrome'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    // logLevel: karma.LOG_INFO,

    // plugins to load
    plugins: [
      'karma-jasmine',
      'karma-growl-reporter',
      'karma-junit-reporter',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-script-launcher',
      'karma-ng-scenario'
    ]
  });
}