// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // list of files / patterns to load in the browser

    // **/*.js: All files with a "js" extension in all subdirectories
    // **/!(jquery).js: Same as previous, but excludes "jquery.js"
    // **/(foo|bar).js: In all subdirectories, all "foo.js" or "bar.js" files

    files: [
      'tests/unit/main.js',
      { pattern: 'app/modules/**/**/*.js', included: false, served: true },
      { pattern: 'app/modules/**/scripts/*.js', included: false, served: true },
      { pattern: 'app/modules/**/controllers/*.js', included: false, served: true },
      { pattern: 'app/modules/**/directives/*.js', included: false, served: true },
      { pattern: 'app/modules/**/factories/*.js', included: false, served: true },
      { pattern: 'app/modules/**/services/*.js', included: false, served: true },
      { pattern: 'app/components/**/*.js', included: false, served: true, watched: false },
    ],

    // list of files / patterns to exclude
    exclude: [
      'app/modules/main.js',
      'app/modules/**/test*/e2e/*'
    ],

    /* Start these browsers, currently available:
      Chrome
      ChromeCanary
      PhantomJS
      Firefox
      Opera
      Internet Explorer
      Safari
    */
    browsers: [
      'Chrome',
      'PhantomJS',
    ],

    // http://karma-runner.github.io/0.8/config/preprocessors.html
    preprocessors: {
      'app/**/*.html': ['ng-html2js']
    },

    //https://github.com/karma-runner/karma-ng-html2js-preprocessor
    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/',
      // prepend this to the
      // prependPrefix: '',
      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      // moduleName: 'templates'
    },

    // level of logging: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // base path, that will be used to resolve files and exclude
    basePath: './',

    // web server port
    port: 9090,

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['requirejs', 'jasmine'],

    // Additional reporters, such as growl, junit, teamcity or coverage
    reporters: ['progress'],

    // Continuous Integration mode, if true, it capture browsers, run tests and exit
    // singleRun: false, // (set it grunt file)

    // enable / disable watching file and executing tests whenever any file changes
    // autoWatch: true, // (set it grunt file)

    // Enable or disable colors in the output (reporters and logs).
    colors: true
  });
};
