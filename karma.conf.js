module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: './',
    // frameworks to use
    frameworks: ['requirejs', 'jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'app/modules/application/tests/unit/main.js',
      { pattern: 'app/modules/application/scripts/*.js', included: false, served: true },
      { pattern: 'app/modules/application/*.js', included: false, served: true },
      { pattern: 'app/modules/cs_account/scripts/*.js', included: false, served: true },
      { pattern: 'app/modules/cs_account/*.js', included: false, served: true },
      { pattern: 'app/modules/cs_common/scripts/*.js', included: false, served: true },
      { pattern: 'app/modules/cs_common/*.js', included: false, served: true },
      { pattern: 'app/modules/cs_session/scripts/*.js', included: false, served: true },
      { pattern: 'app/modules/cs_session/*.js', included: false, served: true },
      { pattern: 'app/modules/users/scripts/*.js', included: false, served: true },
      { pattern: 'app/modules/users/*.js', included: false, served: true },

      { pattern: 'app/components/**/*.js', included: false, served: true, watch: false },
      // { pattern: 'test/unit/**/*.js', included: false, served: true },
    ],
    // list of files to exclude
    exclude: [
      'app/modules/application/main.js'
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
      'karma-safari-launcher',
      'karma-browserstack-launcher',
    ]
  });
};
