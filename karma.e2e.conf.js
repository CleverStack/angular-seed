// url path, that will be used to resolve files and exclude
urlRoot = '/base/app';
// frameworks to use
frameworks = ['ng-scenario'];
// list of files / patterns to load in the browser
files = [
  'app/components/angular/angular.js',
  'app/components/angular-resource/angular-resource.js',
  'app/components/angular-http-auth/src/http-auth-interceptor.js',
  'app/components/underscore/underscore.js',
  { pattern: 'app/views/**/*.html', included: false, served: true },
  { pattern: 'app/styles/**/*.css', included: false, served: true },
  { pattern: 'app/*.html', included: false, served: true },
  'app/scripts/**/*.js',
  'test/e2e/**/*.js'
];
// list of files to exclude
exclude = [
];
// test results reporter to use
// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
reporters = ['progress', 'growl'];
// web server port
port = 9200;
// cli runner port
runnerPort = 9201;
// enable / disable colors in the output (reporters and logs)
colors = true;
// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;
// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];
// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;
// plugins to load
plugins = [
  'karma-jasmine',
  'karma-phantomjs-launcher',
  'karma-growl-reporter',
  'karma-coverage',
  'karma-chrome-launcher',
  'karma-script-launcher',
  'karma-ng-scenario'
];
