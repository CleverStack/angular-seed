var path            = require('path')
  , utils           = require('utils')
  , merge           = require('deepmerge')
  , registerFuncs   = []
  , gruntConfig     = {};

/**
 * Helper function to load grunt task configuration objects and register tasks
 * @param  {String} taskNames the names of the tasks you want to load
 */
function loadGruntConfigs(taskNames, rootPath) {
  'use strict';

  rootPath = rootPath || __dirname;

  taskNames.forEach(function(taskName) {
    var gruntTask   = require(path.resolve(path.join(rootPath, 'tasks', 'grunt', taskName)))
      , hasRegister = gruntTask.config && gruntTask.register
      , taskConfig  = {};

    // Extend the main grunt config with this tasks config
    taskConfig[taskName.replace('.js', '')] = !!hasRegister ? gruntTask.config : gruntTask;
    gruntConfig = merge(gruntConfig, taskConfig);

    // Allow registration of grunt tasks
    if (!!hasRegister) {
      registerFuncs.push(gruntTask.register);
    }
  });
}

module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Load the base configuration object
  gruntConfig.appConfig = require(path.resolve(path.join(__dirname, 'config', 'global.json')));

  // Load the grunt task config files for all modules and the base
  loadGruntConfigs(utils.helpers.getFilesForFolder(path.resolve(path.join(__dirname, 'tasks', 'grunt'))));

  // Initialize the config
  grunt.initConfig(gruntConfig);

  // Fire the callbacks and allow the modules to register their tasks
  registerFuncs.forEach(function(registerTasks) {
    registerTasks(grunt);
  });

  grunt.registerTask('server', [
    'clean:server',
    'connect:livereload',
    'connect:dist',
    'concurrent:watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jade:compile',
    'useminPrepare',
    'jshint',
    'imagemin',
    'less',
    'cssmin',
    'copy:dist',
    'ngAnnotate:dist',
    'requirejs',
    // 'copy:distScripts',
    // 'compress',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('serve', 'Alias.', [
    'server'
  ]);

  grunt.registerTask('default', ['build']);
};
