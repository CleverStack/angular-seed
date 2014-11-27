var fs        = require( 'fs' )
  , path      = require( 'path' )
  , lrSnippet = require( 'grunt-contrib-livereload/lib/utils' ).livereloadSnippet;

var mountFolder = function( connect, dir ) {
  'use strict';

  return connect.static( path.resolve( dir ) );
};

var fallbackToIndex = function( connect, index, file ) {
  'use strict';

  return connect().use( function( req, res, next ) {
    if( req.url === file ) {
      return next();
    }

    if( /views\/(.*).html$/.test( req.url ) ) {
      res.end( fs.readFileSync( index ) );
    }

    res.end( fs.readFileSync( index ) );
  });
};

module.exports = function (grunt) {
  'use strict';

  // grunt helpers
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // configurations
  var appConfig = require( path.resolve( path.join( __dirname, 'config', 'global.json' ) ) );

  grunt.initConfig({
    appConfig:          appConfig,
    watch: {
      livereload: {
        options: {
          livereload:   true
        },
        files: [
          '<%= appConfig.dev.path %>/components/bootstrap/{,*/}*.css',
          '<%= appConfig.dev.path %>/styles/{,*/}*.css',
          '<%= appConfig.dev.path %>/{,*/}*.html',
          '<%= appConfig.dev.path %>/modules/**/{,*/}*.{css,js,html}',
          '{.tmp,<%= appConfig.dev.path %>}/styles/*.css',
          '{.tmp,<%= appConfig.dev.path %>}/views/{,*/}*.html',
          '{.tmp,<%= appConfig.dev.path %>}/scripts/{,*/}*.js',
          '<%= appConfig.dev.path %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      less: {
        files: [
          '<%= appConfig.dev.path %>/components/bootstrap/less/*.less',
          '<%= appConfig.dev.path %>/styles/less/**/*.less',
          '<%= appConfig.dev.path %>/modules/**/styles/**/*.less'
        ],
        tasks: [
          'less:css'
        ]
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
        port:           '<%= appConfig.dev.port %>',
        hostname:       '<%= appConfig.dev.hostname %>',
        livereload:     '<%= appConfig.dev.liveReloadPort %>'
      },
      livereload: {
        options: {
          middleware:   function( connect ) {
            return [
              lrSnippet,
              mountFolder( connect, '.tmp' ),
              mountFolder( connect, appConfig.dev.path ),
              fallbackToIndex( connect, 'app/index.html', '/index.html' )
            ];
          }
        }
      },
      dist: {
        options: {
          livereload:   false,
          port:         '<%= appConfig.dist.port %>',
          base:         '<%= appConfig.dist.path %>',
          middleware:   function( connect ) {
            return [
              connect.compress(),
              mountFolder( connect, appConfig.dist.path ),
              fallbackToIndex( connect, appConfig.dist.path + '/index.html', '/index.html' )
            ];
          }
        }
      },
      coverage: {
        options: {
          base:         '<%= appConfig.test.unit.coverage.path %>',
          directory:    '<%= appConfig.test.unit.coverage.path %>',
          port:         '<%= appConfig.test.unit.coverage.port %>',
          keepalive:    true,
          livereload:   false
        }
      },
      coverageE2E: {
        options: {
          port:         '<%= appConfig.test.e2e.coverage.port %>',
          middleware:   function( connect ) {
            return [
              mountFolder( connect, appConfig.test.e2e.instrumented.path + 'app' ),
              fallbackToIndex( connect, appConfig.test.e2e.instrumented.path + 'app/index.html', '/index.html' )
            ];
          },
          livereload:   false,
          debug:        false
        }
      },
      coverageE2EReport: {
        options: {
          port:         '<%= appConfig.test.e2e.report.port %>',
          middleware:   function( connect ) {
            return [
              mountFolder( connect, appConfig.test.e2e.coverage.path + '/reports' ),
              fallbackToIndex( connect, appConfig.test.e2e.coverage.path + 'reports/index.html', '/index.html' )
            ];
          },
          keepalive:    true,
          livereload:   false
        }
      },
      coverageE2EReportNoWait: {
        options: {
          port:         '<%= appConfig.test.e2e.report.port %>',
          middleware:   function( connect ) {
            return [
              mountFolder( connect, appConfig.test.e2e.coverage.path + '/reports' ),
              fallbackToIndex( connect, appConfig.test.e2e.coverage.path + 'reports/index.html', '/index.html' )
            ];
          },
          keepalive:    false,
          livereload:   false
        }
      }
    },
    clean: {
      server:           '.tmp',
      dist: {
        files: [{
          dot:          true,
          src:          [ '.tmp', '<%= appConfig.dist.path %>/*', '!<%= appConfig.dist.path %>/.git*' ]
        }]
      },
      coverage: {
        files: [{
          dot:          true,
          src:          [ '<%= appConfig.test.unit.coverage.path %>*' ]
        }]
      },
      coverageE2E: {
        files: [{
          dot:          true,
          src:          [ '<%= appConfig.test.e2e.coverage.path %>*' ]
        }]
      },
    },
    jshint: {
      options: {
        jshintrc:       '.jshintrc',
        reporter:       require( 'jshint-stylish' ),
        ignores: [
          '<%= appConfig.dev.path %>/modules/**/test*/**/*.js'
        ]
      },
      all:              [
        'Gruntfile.js',
        '<%= appConfig.dev.path %>/modules/**/*.js'
      ],
    },
    useminPrepare: {
      html:             '<%= appConfig.dev.path %>/index.html',
      options: {
        root:           '<%= appConfig.dev.path %>',
        dest:           '<%= appConfig.dist.path %>'
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
    },
    usemin: {
      html:             [ '<%= appConfig.dist.path %>/index.html', '<%= appConfig.dist.path %>/modules/**/views/**/*.html' ],
      css:              [ '<%= appConfig.dist.path %>/styles/**/*.css' ],
      options: {
        dirs:           [ '<%= appConfig.dist.path %>' ]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand:       true,
          cwd:          '<%= appConfig.dev.path %>/images',
          src:          '**/*.{png,jpg,jpeg}',
          dest:         '<%= appConfig.dist.path %>/images'
        },
        {
          expand:       true,
          cwd:          '<%= appConfig.dev.path %>/components',
          src:          '**/*.{png,jpg,jpeg}',
          dest:         '<%= appConfig.dist.path %>/components'
        }]
      }
    },
    less: {
      css: {
        options: {
          paths:        [ '<%= appConfig.dist.path %>/styles' ]
        },
        files: [
          {
            dest:       '<%= appConfig.dev.path %>/styles/application.css',
            src:        [

              '<%= appConfig.dev.path %>/styles/less/application.less',
              '<%= appConfig.dev.path %>/modules/**/styles/**/*.less',
              '<%= appConfig.dev.path %>/modules/**/styles/**/*.css'
            ]
          }
        ]
      }
    },
    cssmin: {
      options: {
        root:           './app',
        relativeTo:     '/'
      },
      dist: {
        files: {
          '<%= appConfig.dist.path %>/styles/screen.css': [
            '<%= appConfig.dev.path %>/styles/preloader.css',
            '<%= appConfig.dev.path %>/styles/bootstrap.css',
            '<%= appConfig.dev.path %>/components/fontawesome/css/font-awesome.min.css',
            '<%= appConfig.dev.path %>/components/angular-ui/build/angular-ui.min.css',
            '<%= appConfig.dev.path %>/components/ng-table/ng-table.min.css',
            '<%= appConfig.dev.path %>/components/jquery-minicolors/jquery.minicolors.css',
            '<%= appConfig.dev.path %>/components/select2/select2.css',
            '<%= appConfig.dev.path %>/components/select2/select2-bootstrap.css',
            '<%= appConfig.dev.path %>/styles/application.css'
          ]
        }
      },
    },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes:      true,
          collapseWhitespace:             true,
          removeAttributeQuotes:          true,
          removeComments:                 true,
          removeEmptyAttributes:          true,
          removeRedundantAttributes:      true,
          removeScriptTypeAttributes:     true,
          removeStyleLinkTypeAttributes:  true
        },
        files: [{
          expand:       true,
          cwd:          '<%= appConfig.dist.path %>',
          src:          [ 'index.html', 'modules/**/views/**/*.html' ],
          dest:         '<%= appConfig.dist.path %>'
        }]
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes:   true,
        regexp:         '^(ng\n?[\\ ]+(.*)|(module.*))$'
      },
      dist: {
        files:          [ { add: true, src: 'dist/modules/**/*.js' } ]
      }
    },
    requirejs: {
      compile: {
        options: {
          name:                     'main',
          baseUrl:                  '<%= appConfig.dist.path %>/modules',
          out:                      '<%= appConfig.dist.path %>/scripts/scripts.js',
          findNestedDependencies:   true,
          preserveLicenseComments:  false,
          generateSourceMaps:       false,
          optimize:                 'uglify2',
          uglify2: {
            mangle:                 true,
            compress: {
              'drop_console':       true,
              'drop_debugger':      true,
              'dead_code':          true,
              'join_vars':          true,
              'if_return':          true,
              'negate_iife':        true,
              booleans:             true,
              loops:                true,
              unused:               true
            }
          }
        }
      }
    },
    rev: {
      dist: {
        files: {
          src:          [
            '<%= appConfig.dist.path %>/scripts/{,*/}*.js',
            '<%= appConfig.dist.path %>/styles/{,*/}*.css',
            '<%= appConfig.dist.path %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= appConfig.dist.path %>/styles/fonts/*'
          ]
        }
      }
    },
    copy: {
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
    concurrent: {
      watch: {
        tasks:          [
          'watch:livereload',
          'watch:less'
        ],
        options:        {
          logConcurrentOutput: true
        }
      }
    },
    open: {
      server: {
        url:            'http://localhost:<%= connect.options.port %>'
      },
      test: {
        url:            'http://localhost:<%= connect.test.options.port %>'
      },
      dist: {
        url:            'http://localhost:<%= connect.dist.options.port %>'
      },
      coverage: {
        url:            'http://localhost:<%= appConfig.test.unit.coverage.port %>'
      },
      coverageE2E: {
        url:            'http://localhost:<%= appConfig.test.e2e.report.port %>'
      }
    },
    karma: {
      unit: {
        configFile:     '<%= appConfig.test.unit.conf %>',
        autoWatch:      false,
        singleRun:      true
      },
      unitAuto: {
        configFile:     '<%= appConfig.test.unit.conf %>',
        autoWatch:      true,
        singleRun:      false
      },
      unitCoverage: {
        configFile:     '<%= appConfig.test.unit.conf %>',
        autoWatch:      false,
        singleRun:      true,
        reporters:      [ 'progress', 'coverage' ],
        preprocessors: {
          './app/modules/**/*.js': [ 'coverage' ]
        },
        coverageReporter: {
          type:         'html',
          dir:          '<%= appConfig.test.unit.coverage.path %>'
        }
      },
      travis: {
        configFile:     '<%= appConfig.test.unit.conf %>',
        autoWatch:      false,
        singleRun:      true,
        browsers:       [ 'PhantomJS' ]
      }
    },
    protractor: {
      options: {
        configFile:     '<%= appConfig.test.e2e.conf %>',
        args: {
          seleniumPort: '<%= appConfig.test.e2e.seleniumPort %>'
        }
      },
      singlerun: {
        keepAlive:      false
      },
      auto: {
        keepAlive:      true
      }
    },
    'protractor_coverage': {
      local: {
        options: {
          configFile:   '<%= appConfig.test.e2e.conf %>',
          keepAlive:    true,
          noColor:      false,
          coverageDir:  '<%= appConfig.test.e2e.instrumented.path %>',
          args: {
            baseUrl:    'http://localhost:<%= appConfig.test.e2e.coverage.port %>'
          }
        }
      }
    },
    instrument: {
      options: {
        lazy:           true,
        basePath:       '<%= appConfig.test.e2e.instrumented.path %>'
      },
      files:            [
        'app/modules/**/scripts/*.js',
        'app/modules/**/controllers/*.js',
        'app/modules/**/directives/*.js',
        'app/modules/**/factories/*.js',
        'app/modules/**/services/*.js'
      ]
    },
    makeReport: {
      src:              '<%= appConfig.test.e2e.instrumented.path %>*.json',
      options: {
        type:           'html',
        dir:            '<%= appConfig.test.e2e.coverage.path %>reports',
        print:          'detail'
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [
          // Each of the files in the src/ folder will be output to
          // the dist/ folder each with the extension .gz.js
          { expand: true, src: [ 'scripts/*.js', ], dest: 'dist/', ext: '.js', cwd: '.tmp/' }
        ]
      }
    }
  });

  //to initialise bootstrap run 'grunt bootstrap'
  grunt.registerTask('bootstrap', ['copy:bootstrap']);

  //for less compilation force
  grunt.option( 'force', true );

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

  grunt.registerTask('test', 'Run both unit and e2e tests', [
    'test:unit',
    'test:e2e'
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
    'connect:livereload',
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