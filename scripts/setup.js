var async_exec = require('child_process').exec

async_exec('npm install shelljs', function (err, stdout, stderr) {
  require('shelljs/global');

  echo('About to setup Appgular environment');
  echo('It works if it finishes with OK');

  if(!which('bower')) {
    echo('Bower is missing...taking care of that now.');
    exec('npm install --global bower');
    echo(exec('bower --version').output);
  }

  if(!which('yo')) {
    echo('Yeoman is missing...taking care of that now.');
    exec('npm install --global yo');
    echo(exec('yo --version').output);
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
    exec('npm install --global karma@canary');
    echo(exec('karma --version').output);
  }

  echo('Installing devDependencies...');
  exec('npm install');

  echo('Installing components...');
  exec('bower install');

  echo('OK!');
});