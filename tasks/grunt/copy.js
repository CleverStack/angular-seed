module.exports = {
  config: {
    distScripts: {
      files: [{
        expand:       true,
        dot:          true,
        cwd:          '<%= appConfig.dist.path %>',
        dest:         '.tmp',
        src:          [
          'scripts/**/*'
        ]
      }]
    },
    dist: {
      files: [{
        expand:       true,
        dot:          true,
        cwd:          '<%= appConfig.dev.path %>',
        dest:         '<%= appConfig.dist.path %>',
        src:          [
          '*.{ico,txt}',
          '.htaccess',
          'components/**/*.{js,css,eot,svg,ttf,woff,png,jpg,jpeg,gif,webp}',
          'images/{,*/}*.{gif,webp,png}',
          'images/**/*.{gif,webp,png}',
          'styles/fonts/**/*',
          'scripts/**/*',
          'fonts/**/*',
          'home/**/*',
          'modules/**/*',
          'index.html'
        ]
      }]
    },
    coverageE2E: {
      files: [{
        expand:       true,
        dot:          true,
        cwd:          '<%= appConfig.dev.path %>',
        dest:         '<%= appConfig.test.e2e.instrumented.path %>app',
        src:          [
          '*.{ico,txt}',
          '.htaccess',
          'components/**/*.{js,css,eot,svg,ttf,woff,png,jpg,jpeg,gif,webp}',
          'images/{,*/}*.{gif,webp,png}',
          'images/**/*.{gif,webp,png}',
          'styles/**/*',
          'scripts/**/*',
          'fonts/**/*',
          'home/**/*',
          'modules/main.js',
          'modules/**/main.js',
          'modules/**/module.js',
          'modules/**/views/**',
          'modules/**/styles/**',
          'index.html'
        ]
      }]
    },
    bootstrap: {
      files:          [
        {
          expand:     true,
          filter:     'isFile',
          cwd:        '<%= appConfig.dev.path %>/components/bootstrap/dist/js',
          dest:       '<%= appConfig.dev.path %>/scripts',
          src:        [ 'bootstrap.js' ]
        },
        {
          expand:     true,
          filter:     'isFile',
          cwd:        '<%= appConfig.dev.path %>/components/bootstrap/dist',
          dest:       '<%= appConfig.dev.path %>',
          src:        [ 'fonts/*' ]
        },
        {
          expand:     true,
          filter:     'isFile',
          cwd:        '<%= appConfig.dev.path %>/components/bootstrap/dist/css',
          dest:       '<%= appConfig.dev.path %>/styles',
          src:        [ 'bootstrap.css' ]
        },
        {
          expand:     true,
          filter:     'isFile',
          cwd:        '<%= appConfig.dev.path %>/components/bootstrap/less',
          dest:       '<%= appConfig.dev.path %>/styles/less/bootstrap',
          src:        [
            '**/*.less'
          ]
        }
      ]
    }
  },
  register: function(grunt) {
    // to initialise bootstrap run 'grunt bootstrap'
    grunt.registerTask('bootstrap', ['copy:bootstrap']);
  }
};
