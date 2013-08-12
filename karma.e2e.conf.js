module.exports = function (karma) {
  karma.set({
    // url path, that will be used to resolve files and exclude
    basePath: './',

    // frameworks to use
    frameworks: ['requirejs', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/components/requirejs/require.js',
      'test/e2e/main.js',
      { pattern: 'app/scripts/**/*.js', included: false, served: true },
      { pattern: 'app/views/**/*.html', included: false, served: true },
      { pattern: 'app/components/**/*.js', included: false, served: true },
      { pattern: 'test/e2e/**/*.js', included: false, served: true },
      { pattern: 'test/mocks/**/*.js', included: false, served: true },
    ],

    // list of files to exclude
    exclude: [
      'app/scripts/main.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],
    
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
    // browsers: ['BrowserStack:Chrome:Mac'],
    browsers: ['Chrome'],
    
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    
    // plugins to load
    plugins: [
      'karma-coverage',
      'karma-requirejs',
      'karma-jasmine',
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
    
