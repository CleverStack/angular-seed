module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: './',
    // frameworks to use
    frameworks: ['requirejs', 'jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'test/unit/main.js',
      { pattern: 'app/modules/**/**/*.js', included: false, served: true },
      { pattern: 'app/modules/**/scripts/*.js', included: false, served: true },
      { pattern: 'app/components/**/*.js', included: false, served: true, watched: false },
      { pattern: 'app/modules/**/tests/unit/**/*.js', included: false, served: true }
    ],
    // list of files to exclude
    exclude: [
      'app/modules/main.js'
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
    browsers: [
      'PhantomJS'
    ],

    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    // logLevel: config.LOG_DEBUG,

    // plugins to load
    plugins: [
      'karma-requirejs',
      'karma-jasmine',
      'karma-coverage',
      'karma-html2js-preprocessor',
      'karma-growl-reporter',
      'karma-junit-reporter',
      'karma-script-launcher',
      'karma-phantomjs-launcher',
      'karma-safari-launcher',
      'karma-browserstack-launcher',
    ]
  });
};
