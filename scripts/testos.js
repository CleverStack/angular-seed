var async_exec = require('child_process').exec

async_exec('npm install shelljs', function (err, stdout, stderr) {
  require('shelljs/global');
  var os = require('os');

  echo('Testing OS environment');

  /*
    What platform you're running on: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
    win32 (for 32 or 64 bit)
  */
  echo('OS detected is: '+os.platform());

  var isWin = /^win32/.test(os.platform());
  echo ('isWin = '+isWin);

  var isLinux = /^linux/.test(os.platform());
  echo ('isLinux = '+isLinux);

  var isMac = /^darwin/.test(os.platform()) || /^freebsd/.test(os.platform());
  echo ('isMac = '+isMac);

});
