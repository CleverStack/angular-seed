var async_exec = require( 'child_process' ).exec

async_exec( 'npm install shelljs', function( err, stdout, stderr ) {
  require( 'shelljs/global' );

  //detect OS
  var os = require( 'os' )
    , isWin = /^win32/.test( os.platform() )
    , isLinux = /^linux/.test( os.platform() )
    , isMac = /^darwin/.test( os.platform() ) || /^freebsd/.test( os.platform() );

  echo( 'About to setup protractor and dependencies.' );
  echo( 'It works if it finishes with OK' );

  //Selenium Standalone Server - required for protractor e2e testing
  //Note: Protractor comes with a script to help download and install the standalone server. Run 'webdriver-manager-update': https://github.com/angular/protractor/blob/master/docs/getting-started.md
  //https://code.google.com/p/selenium/downloads/list
  //Size: ~33mb
  echo( 'Downloading specific Selenium Server jar...' );
  exec( 'wget http://selenium.googlecode.com/files/selenium-server-standalone-2.39.0.jar' );
  exec( 'mv selenium-server-standalone-2.39.0.jar scripts/selenium-server-standalone-2.39.0.jar' );

  //Chrome driver required to run Chrome on Selenium Server
  //Note: download file is based on OS (CLI to handle which one to download)
  //http://chromedriver.storage.googleapis.com/index.html
  //Size: ~6mb
  var chromedriverLink;
  if (isWin) {
    chromedriverLink = 'chromedriver_win32.zip';
  } else if (isLinux) {
    chromedriverLink = 'chromedriver_linux32.zip';
  } else if (isMac) {
    chromedriverLink = 'chromedriver_mac32.zip';
  }
  echo( 'Downloading OS specific Chromedriver...' );
  exec( 'wget http://chromedriver.storage.googleapis.com/2.8/' + chromedriverLink);
  exec( 'unzip ' + chromedriverLink );

  if ( isWin ) {
    exec( 'mv Chromedriver.exe scripts/Chromedriver.exe' );
  } else {
    exec( 'mv Chromedriver scripts/Chromedriver' );
  }
  exec( 'rm ' + chromedriverLink );

  //PhantomJS driver required to run on Selenium Server
  //Note: download file is based on OS (CLI to handle which one to download)
  //http://phantomjs.org/download.html
  //Size: ~7mb
  var phantomjsLink, linkExt;
  if ( isWin ) {
    phantomjsLink = 'phantomjs-1.9.2-windows';
    linkExt = '.zip';
  } else if ( isLinux ) {
    phantomjsLink = 'phantomjs-1.9.2-linux-i686';
    linkExt = '.tar.bz2';
  } else if ( isMac ) {
    phantomjsLink = 'phantomjs-1.9.2-macosx';
    linkExt = '.zip';
  }
  echo( 'Downloading OS specific Phantomjs...' );
  exec( 'wget http://phantomjs.googlecode.com/files/' + phantomjsLink + linkExt );
  if (isLinux) {
    exec( 'tar -xjvf ' + phantomjsLink + linkExt );
  } else {
    exec( 'unzip ' + phantomjsLink + linkExt );
  }
  exec( 'mv ' + phantomjsLink + '/phantomjs.exe scripts/phantomjs.exe' );
  exec( 'rm ' + phantomjsLink + linkExt);
  exec( 'rm -rf ' + phantomjsLink );

  echo( 'OK!' );
});