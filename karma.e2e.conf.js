module.exports = function (karma) {
  karma.set({
    // url path, that will be used to resolve files and exclude
    urlRoot: '/base/app',

    // frameworks to use
    frameworks: ['ng-scenario'],

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
      { pattern: 'app/views/**/*.html', included: false, served: true },
      { pattern: 'app/styles/**/*.css', included: false, served: true },
      { pattern: 'app/*.html', included: false, served: true },
      { pattern: 'app/index.html', included: true, served: true },
      'test/e2e/**/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    // web server port
    port: 9200,

    // cli runner port
    runnerPort: 9201,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: karma.LOG_INFO,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // Also available are:
    // - BrowserStack:Chrome:Win
    // - BrowserStack:Chrome:Mac
    // - BrowserStack:Firefox:Win
    // - BrowserStack:Firefox:Mac
    // - BrowserStack:IE:Win
    // - BrowserStack:iPad 3rd (6.0):iOS
    browsers: ['BrowserStack:Chrome:Mac'],
    // browsers: ['Chrome'],
    
    
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    
    // plugins to load
    plugins: [
      'karma-coverage',
      'karma-ng-scenario',
      'karma-html2js-preprocessor',
      'karma-growl-reporter',
      'karma-browserstack-launcher',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-script-launcher',
    ]
  });
}
    
