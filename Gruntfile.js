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
          "path": "./test/coverage/unit/" // browsable directory for unit testing code coverage reports
        },
      "conf": "./test-unit.conf.js"
      },
      "e2e": {
        "seleniumPort": "4444", // default 4444
        "path": "./test", // if you change this it must reflect in your test-e2e.conf.js
        "conf": "./test-e2e.conf.js",
        "coverage": {
          "port": "7776", // default 5555
          "path": "./test/coverage/e2e/" // browsable directory for e2e testing code coverage reports
        },
        "report": {
          "port": "7777"
        },
        "instrumented": {
          "path": './test/coverage/e2e/instrumented/'
        }
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
          '<%= appConfig.dev.path %>/modules/**/{,*/}*.{css,js,less,html}',
          '{.tmp,<%= appConfig.dev.path %>}/styles/{,*/}*.css',
          '{.tmp,<%= appConfig.dev.path %>}/views/{,*/}*.html',
          '{.tmp,<%= appConfig.dev.path %>}/scripts/{,*/}*.js',
          '<%= appConfig.dev.path %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      less: {
        files: [
          '<%= appConfig.dev.path %>/components/bootstrap/less/*.less',
          '<%= appConfig.dev.path %>/styles/less/**/*.less',
          '<%= appConfig.dev.path %>/modules/**/styles/less/*.less'
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
        tasks: [ 'protractor:singlerun' ]
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
      },
      coverageE2E: {
        options: {
          port: '<%= appConfig.test.e2e.coverage.port %>',
          middleware: function (connect) {
            return [
              mountFolder( connect, appConfig.test.e2e.instrumented.path + 'app' ),
              fallbackToIndex( connect, appConfig.test.e2e.instrumented.path + 'app/index.html', '/index.html' )
            ];
          },
          livereload: false,
          debug: false
        }
      },
      coverageE2EReport: {
        options: {
          port: '<%= appConfig.test.e2e.report.port %>',
          middleware: function (connect) {
            return [
              mountFolder( connect, appConfig.test.e2e.coverage.path + '/reports' ),
              fallbackToIndex( connect, appConfig.test.e2e.coverage.path + 'reports/index.html', '/index.html' )
            ];
          },
          keepalive: true,
          livereload: false
        }
      },
      coverageE2EReportNoWait: {
        options: {
          port: '<%= appConfig.test.e2e.report.port %>',
          middleware: function (connect) {
            return [
              mountFolder( connect, appConfig.test.e2e.coverage.path + '/reports' ),
              fallbackToIndex( connect, appConfig.test.e2e.coverage.path + 'reports/index.html', '/index.html' )
            ];
          },
          keepalive: false,
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
      coverage: {
        files: [{
          dot: true,
          src: [
            '<%= appConfig.test.unit.coverage.path %>*'
          ]
        }]
      },
      coverageE2E: {
        files: [{
          dot: true,
          src: [
            '<%= appConfig.test.e2e.coverage.path %>*'
          ]
        }]
      },
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
        files: [{
          dest: '<%= appConfig.dev.path %>/styles/application.css',
          src: [
            '<%= appConfig.dev.path %>/styles/less/application.less',
            '<%= appConfig.dev.path %>/modules/**/styles/less/*.less'
          ]
        }]
      },
      production: {
        options: {
          paths: ['<%= appConfig.dist.path %>/styles'],
          cleancss: true
        },
        files: [{
          dest: '<%= appConfig.dev.path %>/styles/application.css',
          src: [
            '<%= appConfig.dev.path %>/styles/less/application.less',
            '<%= appConfig.dev.path %>/modules/**/styles/less/*.less'
          ]
        }]
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
            'scripts/**/*',
            'fonts/**/*',
            'home/**/*',
            'modules/**/*'
          ]
        }]
      },
      coverageE2E: {
          files: [{
          expand: true,
          dot: true,
          cwd: '<%= appConfig.dev.path %>',
          dest: '<%= appConfig.test.e2e.instrumented.path %>app',
          src: [
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
        files: [
          {
              expand: true,
              filter: 'isFile',
              cwd: '<%= appConfig.dev.path %>/components/bootstrap/dist/js',
              dest: '<%= appConfig.dev.path %>/scripts',
              src: [
                'bootstrap.js'
              ]
          },
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
      },
      coverageE2E: {
        url: 'http://localhost:<%= appConfig.test.e2e.report.port %>'
      }
    },
    // unit testing config
    karma: {
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
    },

    // e2e protractor coverage
    protractor_coverage: {
      local: {
        options: {
          configFile: '<%= appConfig.test.e2e.conf %>',
          keepAlive: true,
          noColor: false,
          coverageDir: '<%= appConfig.test.e2e.instrumented.path %>',
          args: {
            baseUrl: 'http://localhost:<%= appConfig.test.e2e.coverage.port %>'
          }
        }
      }
    },
    instrument: {
      options: {
        lazy: true,
        basePath: '<%= appConfig.test.e2e.instrumented.path %>'
      },
      files: [
        'app/modules/**/scripts/*.js',
        'app/modules/**/controllers/*.js',
        'app/modules/**/directives/*.js',
        'app/modules/**/factories/*.js',
        'app/modules/**/services/*.js'
      ]
    },
    makeReport: {
      src: '<%= appConfig.test.e2e.instrumented.path %>*.json',
      options: {
        type: 'html',
        dir: '<%= appConfig.test.e2e.coverage.path %>reports',
        print: 'detail'
      }
    },
    run: {
      wbDriverUpdate: {
        args: [ './node_modules/protractor/bin/webdriver-manager', 'update', '--out_dir=./scripts/' ],
        options: {
          passArgs: [
            'ie',
            'chrome',
            'standalone',
            'seleniumPort'
          ]
        }
      },
      wbDriverStatus: {
        args: [ './node_modules/protractor/bin/webdriver-manager', 'status' ],
        options: {
          passArgs: [
            'ie',
            'chrome',
            'standalone',
            'seleniumPort'
          ]
        }
      },
      wbDriverStart: {
        args: [ './node_modules/protractor/bin/webdriver-manager', 'start', '--out_dir=./scripts/' ],
        options: {
          passArgs: [
            'ie',
            'chrome',
            'standalone',
            'seleniumPort'
          ]
        }
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

  grunt.registerTask( 'webdriver', [
    'run:wbDriverStatus',
    'run:wbDriverUpdate'
  ]);

  grunt.registerTask( 'webdriver:update', [
    'run:wbDriverUpdate'
  ]);

  grunt.registerTask( 'webdriver:status', [
    'run:wbDriverStatus'
  ]);

  grunt.registerTask( 'webdriver:start', [
    'run:wbDriverStart'
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

  grunt.registerTask('test:coverage', 'Run a unit test coverage report.', [
    'test:run-e2e-coverage',
    'open:coverageE2E',
    'connect:coverageE2EReportNoWait',
    'test:unit-coverage'
  ]);

  grunt.registerTask('test:unit-coverage', 'Run a unit test coverage report and server.', [
    'test:run-unit-coverage',
    'connect:coverage'
  ]);

  grunt.registerTask('test:run-unit-coverage', 'Run a unit test coverage report.', [
    'clean:coverage',
    'karma:unitCoverage',
    'open:coverage'
  ]);

  grunt.registerTask('test:e2e-coverage', 'Run an e2e test coverage report and server.', [
    'test:run-e2e-coverage',
    'open:coverageE2E',
    'connect:coverageE2EReport'
  ]);

  grunt.registerTask('test:run-e2e-coverage', 'Run an e2e test coverage report.', [
    'clean:coverageE2E',
    'copy:coverageE2E',
    'instrument',
    'connect:coverageE2E',
    'protractor_coverage',
    'makeReport'
  ]);

  grunt.registerTask('test:e2e', 'Single run of end to end (e2e) tests using protractor.', [
    'connect:dist',
    'protractor:singlerun'
  ]);

  grunt.registerTask('autotest:e2e', 'Start up the auto end to end (e2e) test server using protractor.', [
    'connect:livereload',
    'protractor:auto',
    'watch:e2eTests'
  ]);

  grunt.registerTask('serve', 'Alias.', [
    'server'
  ]);

  grunt.registerTask('default', ['build']);
};
