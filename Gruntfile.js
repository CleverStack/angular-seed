var path            = require('path')
  , fs              = require('fs')
  , utils           = require('utils')
  , packageJson     = require(__dirname + '/package.json')
  , merge           = require('deepmerge')
  , registerFuncs   = []
  , gruntConfig     = {};

/**
 * Helper function to load grunt task configuration objects and register tasks
 * @param  {String} taskNames the names of the tasks you want to load
 */
function loadGruntConfigs(taskNames, rootPath) {
  rootPath = rootPath || __dirname;

  taskNames.forEach(function(taskName) {
    var gruntTask   = require(path.resolve(path.join(rootPath, 'tasks', 'grunt', taskName)))
      , hasRegister = gruntTask.config && gruntTask.register
      , taskConfig  = {};

    // Extend the main grunt config with this tasks config
    taskConfig[taskName.replace('.js', '')] = !!hasRegister ? gruntTask.config : gruntTask;
    gruntConfig          = merge(gruntConfig, taskConfig);

    // Allow registration of grunt tasks
    if (!!hasRegister) {
      registerFuncs.push(gruntTask.register);
    }
  });
}

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  gruntConfig.appConfig = require(path.resolve(path.join(__dirname, 'config', 'global.json')));

  // Load the grunt task config files
  loadGruntConfigs(utils.helpers.getFilesForFolder(path.resolve(path.join(__dirname, 'tasks', 'grunt'))));

  // @TODO - Load and merge the config of each modules Gruntfile.js!

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
