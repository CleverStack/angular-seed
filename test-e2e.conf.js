var os = require( 'os' )
  , isWin = /^win32/.test( os.platform() );

// A reference configuration file.
exports.config = {
  // ----- How to setup Selenium -----
  //
  // There are three ways to specify how to use Selenium. Specify one of the
  // following:
  //
  // 1. seleniumServerJar - to start Selenium Standalone locally.
  // 2. seleniumAddress - to connect to a Selenium server which is already
  //    running.
  // 3. sauceUser/sauceKey - to use remote Selenium servers via SauceLabs.

  // The location of the selenium standalone server .jar file.
  // http://docs.seleniumhq.org/download/
  seleniumServerJar: './scripts/selenium-server-standalone-2.39.0.jar',
  // The port to start the selenium server on, or null if the server should
  // find its own unused port.
  seleniumPort: 4444,
  // https://npmjs.org/package/protractor
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  // Chromedriver location is used to help the selenium standalone server
  // find chromedriver. This will be passed to the selenium jar as
  // the system property webdriver.chrome.driver. If null, selenium will
  // attempt to find chromedriver using PATH.
  chromeDriver: isWin ? './scripts/Chromedriver.exe' : './scripts/Chromedriver',
  // Additional command line options to pass to selenium. For example,
  // if you need to change the browser timeout, use
  // seleniumArgs: ['-browserTimeout=60'],
  seleniumArgs: [],

  // If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
  // The tests will be run remotely using SauceLabs.
  sauceUser: null,
  sauceKey: null,

  // ----- What tests to run -----
  //
  // Spec patterns are relative to the location of this config.
  specs: [
    './test*/e2e/**/*.js',
    './**/test*/e2e/**/*.js',
    './app/modules/**/test*/e2e/*.js'
  ],

  // ----- Capabilities to be passed to the webdriver instance ----
  //
  // For a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js

  capabilities: {
    'browserName': 'chrome'
  },

  /*
     Example config for PhantomJS

     1. You need to download manually PhantomJS just put in test dir.
        http://phantomjs.org/download.html

     2. You also need to apply this patch to fix a known bug.
        https://github.com/vrtdev/protractor/commit/2f18b01378e4f054331df23ce536e4081ee1ccf0
  */
  // capabilities: {
  //   'browserName': 'phantomjs',
  //   'phantomjs.binary.path': './node_modules/phantom/bin/phantomjs'
  // },

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  // If you change your dev server port this will need to match. - default 'http://127.0.0.1:9000'
  baseUrl: 'http://127.0.0.1:9000',

  // Selector for the element housing the angular app - this defaults to
  // body, but is necessary if ng-app is on a descendant of <body>
  rootElement: 'body',

  // ----- Options to be passed to minijasminenode -----
  jasmineNodeOpts: {
    // onComplete will be called just before the driver quits.
    onComplete: null,
    // If true, display spec names.
    isVerbose: false,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 20000
  }
};
