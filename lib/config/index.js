var path        = require('path')
  , fs          = require('fs')
  , debug       = require('debug')('cleverstack:config')
  , envOverride = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : null
  , fileNames   = ['global', 'default']
  , appRoot     = path.resolve(path.join(__dirname, '..', '..'))
  , configRoot  = path.join(appRoot, 'config')
  , configFiles = { global: [ path.join(configRoot, 'global.json') ], env: [] }
  , utils       = require(path.join(appRoot, 'lib', 'utils'))
  , config;

if (envOverride === null) {
  debug('No environment based config set using NODE_ENV, defaulting to "local" configuration');
  envOverride = 'local';
}

var envConfigFile = path.join(configRoot, envOverride + '.json');
if (fs.existsSync(envConfigFile)) {
  configFiles.env.push(envConfigFile);
}

try {
  config = require('nconf').loadFilesSync([].concat(configFiles.global, configFiles.env));
} catch(e) {
  debug('Error loading configuration: %s', e);
  debug('Files: %s', [].concat(configFiles.global, configFiles.env).join(',\n'));
  if (e.stack) {
    debug(e.stack);
  }
  process.exit(1);
}

module.exports = config;
