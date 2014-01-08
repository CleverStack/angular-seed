/*
 * CleverStack.io
 * https://github.com/clevertech/cleverstack-angular-seed/
 *
 * Copyright (c) 2013 Clevertech.biz
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var fallbackToTest = function (connect) {
  return connect().use(function (req, res, next) {
    fs.exists(__dirname + req.url, function (exists) {
      if(exists) {
        fs.createReadStream(req.url).pipe(res);
      } else {
        fs.createReadStream(__dirname + '/test/e2e/test-index.html').pipe(res);
      }
    });
  });
};

var fallbackToIndex = function (connect, index, file) {
  return connect().use(function (req, res, next) {
    if(req.url === file) {
      return next();
    }
    if(/views\/(.*).html$/.test(req.url)) {
      res.end( fs.readFileSync(index) );
    }
    res.end( fs.readFileSync(index) );
  });
};

module.exports = function (grunt) {

  // grunt helpers
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // configurations
  var appConfig = {

    // Development Server
    "dev": {
      "port": "9000", // default 9000
      "path": "./app", // the development directory of your app
      "liveReloadPort": "35729", // default 35729
      "hostname": "localhost" // using 0.0.0.0 will make the server accessible from anywhere
    },

    // Unit Testing Server
    "test": {
      "port": "9090", // default 9090
      "path": "./test", // if you change this it must reflect in your karma.conf.js
      "coverage": {
        "port": "5555", // default 5555
        "dir": "./test/coverage/" // browsable directory for unit testing code coverage reports
      }
    },

    // Production Preview Server
    "dist": {
      "port": "9009", // default 9009
      "path": "./dist" // directory where you want your production builds to go
    }

  };

  grunt.initConfig({
    appConfig: appConfig,
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= appConfig.dev.path %>/components/bootstrap/{,*/}*.css',
          '<%= appConfig.dev.path %>/styles/{,*/}*.css',
          '<%= appConfig.dev.path %>/{,*/}*.html',
          '{.tmp,<%= appConfig.dev.path %>}/styles/{,*/}*.css',
          '{.tmp,<%= appConfig.dev.path %>}/views/{,*/}*.html',
          '{.tmp,<%= appConfig.dev.path %>}/scripts/{,*/}*.js',
          '<%= appConfig.dev.path %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      less: {
        files: [
          '<%= appConfig.dev.path %>/components/bootstrap/less/*.less',
          '<%= appConfig.dev.path %>/styles/less/**/*.less'
        ],
        tasks: ['less:development']
      },
    },
    connect: {
      options: {
        port: '<%= appConfig.dev.port %>',
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '<%= appConfig.dev.hostname %>',
        livereload: '<%= appConfig.dev.liveReloadPort %>'
      },
      livereload: {
        options: {
          base: [
            '.tmp',
            '<%= appConfig.dev.path %>'
          ]
        }
      },
      test: {
        options: {
          port: '<%= appConfig.test.port %>',
          base: __dirname,
          livereload: false,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.'),
              fallbackToTest(connect)
            ];
          }
        }
      },
      dist: {
        options: {
          livereload: false,
          port: '<%= appConfig.dist.port %>',
          base: '<%= appConfig.dist.path %>'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= appConfig.dist.path %>/*',
            '!<%= appConfig.dist.path %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= appConfig.dev.path %>/scripts/{,*/}*.js'
      ]
    },
    concat: {
      dist: {
        files: {
          '<%= appConfig.dist.path %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= appConfig.dev.path %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= appConfig.dev.path %>/index.html',
      options: {
        dest: '<%= appConfig.dist.path %>'
      }
    },
    usemin: {
      html: ['<%= appConfig.dist.path %>/index.html', '<%= appConfig.dist.path %>/views/**/*.html'],
      css: ['<%= appConfig.dist.path %>/styles/**/*.css'],
      options: {
        dirs: ['<%= appConfig.dist.path %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.dev.path %>/images',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= appConfig.dist.path %>/images'
        }]
      }
    },
    less: {
      development: {
        options: {
          paths: ['<%= appConfig.dist.path %>/styles']
        },
        files: [
          { '<%= appConfig.dev.path %>/styles/application.css': '<%= appConfig.dev.path %>/styles/less/application.less' }
        ]
      },
      production: {
        options: {
          paths: ['<%= appConfig.dist.path %>/styles'],
          cleancss: true
        },
        files: [
          { '<%= appConfig.dev.path %>/styles/application.css': '<%= appConfig.dev.path %>/styles/less/application.less' }
        ]
      },
    },
    cssmin: {
      dist: {
        files: {
          '<%= appConfig.dist.path %>/styles/application.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= appConfig.dev.path %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/appConfig/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= appConfig.dev.path %>',
          src: ['*.html', 'views/**/*.html', 'views/**/partials/*.html'],
          dest: '<%= appConfig.dist.path %>'
        }]
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.dist.path %>/scripts',
          src: '*.js',
          dest: '<%= appConfig.dist.path %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= appConfig.dist.path %>/scripts/scripts.js': [
            '<%= appConfig.dist.path %>/scripts/scripts.js'
          ]
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          name: 'main',
          baseUrl: '<%= appConfig.dist.path %>/scripts',
          mainConfigFile: '<%= appConfig.dist.path %>/scripts/main.js',
          out: '<%=appConfig.dist.path %>/scripts/scripts.js',
          uglify: {
            beautify: false,
            overwrite: true,
            verbose: true,
            'no_mangle': true,
            copyright: true
          }
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= appConfig.dist.path %>/scripts/{,*/}*.js',
            '<%= appConfig.dist.path %>/styles/{,*/}*.css',
            '<%= appConfig.dist.path %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= appConfig.dist.path %>/styles/fonts/*'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appConfig.dev.path %>',
          dest: '<%= appConfig.dist.path %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*.{js,css,eot,svg,ttf,woff,png,jpg,jpeg,gif,webp}',
            'images/{,*/}*.{gif,webp,png}',
            'images/**/*.{gif,webp,png}',
            'styles/fonts/**/*',
            'fonts/**/*',
            'home/**/*'
          ]
        }]
      },
      bootstrap: {
        files: [
          {
              expand: true,
              filter: 'isFile',
              cwd: '<%= appConfig.dev.path %>/components/bootstrap/dist',
              dest: '<%= appConfig.dev.path %>',
              src: [
                'fonts/*'
              ]
          },
          {
              expand: true,
              filter: 'isFile',
              cwd: '<%= appConfig.dev.path %>/components/bootstrap/dist/css',
              dest: '<%= appConfig.dev.path %>/styles',
              src: [
                'bootstrap.css'
              ]
          },
          {
              expand: true,
              filter: 'isFile',
              cwd: '<%= appConfig.dev.path %>/components/bootstrap/less',
              dest: '<%= appConfig.dev.path %>/styles/less/bootstrap',
              src: [
                'variables.less',
                'mixins.less',
                'theme.less'
              ]
          }
        ]
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        url: 'http://localhost:<%= connect.test.options.port %>'
      },
      dist: {
        url: 'http://localhost:<%= connect.dist.options.port %>'
      }
    }
  });

  //to initialise bootstrap run 'grunt bootstrap'
  grunt.registerTask('bootstrap', ['copy:bootstrap']);

  //for less compilation force
  grunt.option("force", true);

  grunt.registerTask('server', [
    'clean:server',
    'connect:livereload',
    'connect:test',
    'connect:dist',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'useminPrepare',
    'imagemin',
    'less',
    'cssmin',
    'htmlmin',
    'copy:dist',
    'ngmin',
    'requirejs',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', ['build']);
};
