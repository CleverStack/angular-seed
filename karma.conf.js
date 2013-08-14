module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: './',
    // frameworks to use
    frameworks: ['requirejs', 'jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'app/components/requirejs/require.js',
      'test/unit/main.js',
      { pattern: 'app/scripts/**/*.js', included: false, served: true },
      { pattern: 'app/components/**/*.js', included: false, served: true },
      { pattern: 'test/unit/**/*.js', included: false, served: true },
    ],
    // list of files to exclude
    exclude: [
      'app/scripts/main.js'
    ],

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

    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    // logLevel: karma.LOG_INFO,

    // plugins to load
    plugins: [
      'karma-requirejs',
      'karma-jasmine',
      'karma-coverage',
      'karma-html2js-preprocessor',
      'karma-growl-reporter',
      'karma-junit-reporter',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-script-launcher',
      'karma-browserstack-launcher',
    ]
  });
}