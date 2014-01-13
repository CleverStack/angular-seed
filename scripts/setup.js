var async_exec = require('child_process').exec

async_exec('npm install shelljs', function (err, stdout, stderr) {
  require('shelljs/global');

  echo('About to setup environment');
  echo('It works if it finishes with OK');

  if(!which('bower')) {
    echo('Bower is missing...taking care of that now.');
    exec('npm install --global bower');
    echo(exec('bower --version').output);
  }

  if(!which('grunt')) {
    echo('Grunt is missing...taking care of that now.');
    exec('npm install --global grunt-cli');
    echo(exec('grunt --version').output);
  }

  if(!which('phantomjs')) {
    echo('PhantomJS is missing...taking care of that now.');
    exec('npm install --global phantomjs');
    echo(exec('phantomjs --version').output);
  }

  if(!which('karma')) {
    echo('Karma is missing...taking care of that now.');
    exec('npm install --global karma');
    echo(exec('karma --version').output);
  }

  echo('Installing devDependencies...');
  exec('npm install');

  echo('Installing components...');
  exec('bower install');

  echo('Downloading BrowserStackTunnel jar cli tool...');
  exec('wget http://www.browserstack.com/BrowserStackTunnel.jar');
  exec('mv BrowserStackTunnel.jar scripts/BrowserStackTunnel.jar');

  //Selenium Standalone Server - required for protractor e2e testing
  //Note: Protractor comes with a script to help download and install the standalone server. Run 'webdriver-manager-update': https://github.com/angular/protractor/blob/master/docs/getting-started.md
  //https://code.google.com/p/selenium/downloads/list
  //Size: ~33mb
  echo('Downloading Selenium Server jar...');
  exec('wget http://selenium.googlecode.com/files/selenium-server-standalone-2.39.0.jar');
  exec('mv selenium-server-standalone-2.39.0.jar scripts/selenium-server-standalone-2.39.0.jar');

  //Chrome driver required to run Chrome on Selenium Server
  //Note: download file is based on OS (CLI to handle which one to download)
  //http://chromedriver.storage.googleapis.com/index.html
  //Size: ~6mb
  echo('Downloading Chromedriver...');
  exec('wget http://chromedriver.storage.googleapis.com/2.8/chromedriver_win32.zip');
  exec('unzip chromedriver_win32.zip');
  exec('mv Chromedriver.exe scripts/Chromedriver.exe');
  exec('rm chromedriver_win32.zip');

  //PhantomJS driver required to run on Selenium Server
  //Note: download file is based on OS (CLI to handle which one to download)
  //http://phantomjs.org/download.htmlex.html
  //Size: ~7mb
  echo('Downloading Chromedriver...');
  exec('wget http://phantomjs.googlecode.com/files/phantomjs-1.9.2-windows.zip');
  exec('unzip phantomjs-1.9.2-windows.zip');
  exec('mv phantomjs-1.9.2-windows/phantomjs.exe scripts/phantomjs.exe');
  exec('rm phantomjs-1.9.2-windows.zip');
  exec('rm -rf phantomjs-1.9.2-windows');

  echo('OK!');
});
