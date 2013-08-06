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
      'app/components/requirejs/require.js',
      'app/scripts/main.js',
      { pattern: 'app/views/**/*.html', included: false, served: true },
      { pattern: 'app/styles/**/*.css', included: false, served: true },
      { pattern: 'app/*.html', included: false, served: true },
      { pattern: 'app/index.html', included: true, served: true },
      'test/unit/**/*.js'
    ],
    // list of files to exclude
    exclude: [
    ],

    browsers: ['BrowserStack:Chrome:Mac'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    // logLevel: karma.LOG_INFO,

    // plugins to load
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-html2js-preprocessor',
      'karma-growl-reporter',
      'karma-junit-reporter',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-script-launcher',
      'karma-browserstack-launcher',
      'karma-ng-scenario'
    ]
  });
}