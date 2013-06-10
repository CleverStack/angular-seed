// base path, that will be used to resolve files and exclude
basePath = '';
// frameworks to use
frameworks = ['jasmine'];
// list of files / patterns to load in the browser
files = [
  'app/components/angular/angular.js',
  'app/components/angular-mocks/angular-mocks.js',
  'app/components/underscore/underscore.js',
  'app/scripts/**/*.js',
  'test/unit/**/*.js'
];
// list of files to exclude
exclude = [
];

// enable / disable colors in the output (reporters and logs)
colors = true;
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// plugins to load
plugins = [
  'karma-jasmine',
  'karma-growl-reporter',
  'karma-junit-reporter',
  'karma-coverage',
  'karma-phantomjs-launcher',
  'karma-chrome-launcher',
  'karma-script-launcher',
  'karma-ng-scenario'
];
