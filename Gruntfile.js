/*
 * CleverStack.io
 * https://github.com/clevertech/cleverstack-angular-seed/
 *
 * Copyright (c) 2013 Clevertech.biz
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

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
      "unit": {
        "port": "9090", // default 9090
        "path": "./test", // if you change this it must reflect in your test-unit.conf.js
        "coverage": {
          "port": "5555", // default 5555
          "path": "./test/coverage/" // browsable directory for unit testing code coverage reports
        },
      "conf": "./karma.conf.js"
      },
      "e2e": {
        "seleniumPort": "4444", // default 4444
        "path": "./test", // if you change this it must reflect in your test-e2e.conf.js
        "conf": "./test-e2e.conf.js"
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
      unitTests: {
        files: [
          'test*/unit/**/*.js',
          '**/test*/unit/**/*.js'
        ]
      },
      e2eTests: {
        files: [
          'test*/e2e/**/*.js',
          '**/test*/e2e/**/*.js'
        ],
        tasks: ['protractor:singlerun']
      }
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
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, appConfig.dev.path),
              fallbackToIndex(connect, 'app/index.html', '/index.html')
            ];
          }
        }
      },
      test: {
        options: {
          port: '<%= appConfig.test.unit.port %>',
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
      },
      coverage: {
        options: {
          base: '<%= appConfig.test.unit.coverage.path %>',
          directory: '<%= appConfig.test.unit.coverage.path %>',
          port: '<%= appConfig.test.unit.coverage.port %>',
          keepalive: true,
          livereload: false
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
      server: '.tmp',
      coverage: './test/coverage'
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
          '<%= appConfig.dist.path %>/styles/screen.css': [
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
          baseUrl: '<%= appConfig.dist.path %>/modules',
          out: '<%= appConfig.dist.path %>/scripts/scripts.js',
          findNestedDependencies: true,
          uglify: {
            beautify: false,
            overwrite: true,
            verbose: true,
            no_mangle: true,
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
            'home/**/*',
            'modules/**/*'
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
    // Concurrent config
    concurrent: {
      watch: {
        tasks: [
          'watch:livereload',
          'watch:less'
        ],
        options: {
            logConcurrentOutput: true
        }
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
      },
      coverage: {
        url: 'http://localhost:<%= appConfig.test.unit.coverage.port %>'
      }
    },
    // unit testing config
    karma: {
      // options {
      //   configFile: './test-unit.conf.js'
      // },
      unit: {
        configFile: '<%= appConfig.test.unit.conf %>',
        autoWatch: false,
        singleRun: true
      },
      unitAuto: {
        configFile: '<%= appConfig.test.unit.conf %>',
        autoWatch: true,
        singleRun: false
      },
      unitCoverage: {
        configFile: '<%= appConfig.test.unit.conf %>',
        autoWatch: false,
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
          './app/modules/**/*.js': ['coverage']
        },
        coverageReporter: {
          type : 'html',
          dir : '<%= appConfig.test.unit.coverage.path %>'
        }
      },
      travis: {
        configFile: '<%= appConfig.test.unit.conf %>',
        autoWatch: false,
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    // e2e protractor testing config
    protractor: {
      options: {
        configFile: '<%= appConfig.test.e2e.conf %>',
        args: {
          seleniumPort: '<%= appConfig.test.e2e.seleniumPort %>'
        }
      },
      singlerun: {
        keepAlive: false
      },
      auto: {
        keepAlive: true
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
    'concurrent:watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
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

  /* -- TEST TASKS ------------------------------------------------ */

  grunt.registerTask('test', 'Start up the auto unit test server.', [
    'test:unit'
  ]);

  grunt.registerTask('test:unit', 'Single run of unit tests.', [
    'karma:unit'
  ]);

  grunt.registerTask('autotest:unit', 'Start up the auto unit test server.', [
    'karma:unitAuto',
    'watch:unitTests'
  ]);

  grunt.registerTask('test:travis', 'Single run of unit tests for Travis CI.', [
    'karma:travis'
  ]);

  grunt.registerTask('test:coverage', 'Run a test coverage report.', [
    'clean:coverage',
    'karma:unitCoverage',
    'open:coverage',
    'connect:coverage'
  ]);

  grunt.registerTask('test:e2e', 'Single run of end to end (e2e) tests using protractor.', [
    'connect:livereload',
    'protractor:singlerun'
  ]);

  grunt.registerTask('autotest:e2e', 'Start up the auto end to end (e2e) test server using protractor.', [
    'connect:livereload',
    'protractor:auto',
    'watch:e2eTests'
  ]);

  grunt.registerTask('default', ['build']);
};
