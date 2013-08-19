'use strict';

var fs = require('fs');

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var fallbackToTest = function (connect) {
  return connect().use(function (req, res, next) {
    // if(req.url === '/') {
    //   fs.createReadStream(__dirname+'/app/index.html').pipe(res);
    //   return;
    // }
    fs.exists(__dirname+req.url, function (exists) {
      if(exists) {
        fs.createReadStream(req.url).pipe(res);
      } else {
        fs.createReadStream(__dirname+'/test/e2e/test-index.html').pipe(res);
      }
    });
  });
}

var fallbackToIndex = function (connect, index, file) {
  return connect().use(function (req, res, next) {
    if(req.url === file) {
      return next();
    }
    res.end( fs.readFileSync(index) );
  });
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    docular: {
      baseUrl: 'http://localhost:9999',
      showAngularDocs: false,
      showDocularDocs: false,
      copyDocDir: '/docs',
      docAPIOrder : ['doc', 'angular'],
      groups: [
        {
          groupTitle: 'CleverStack Seed',
          groupId: 'cleverstack',
          groupIcon: 'icon-book',
          sections: [
            {
              id: "api",
              title: "API",
              scripts: [
                "app/scripts/app.js",
                "app/scripts/config.js",
                "app/scripts/routes.js",
                "app/scripts/services",
                "app/scripts/filters",
                "app/scripts/directives",
                "app/scripts/controllers",
              ]
            }
          ]
        }
      ] //groups of documentation to parse
    },
    watch: {
      livereload: {
        files: [
          '<%= yeoman.app %>/components/bootstrap/{,*/}*.css',
          '<%= yeoman.app %>/styles/{,*/}*.css',
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/views/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      },
      less: {
        files: [
          '<%= yeoman.app %>/components/bootstrap/less/{,*/}*.less',
          '<%= yeoman.app %>/styles/less/{,*/}*.less'
        ],
        tasks: ['less']
      },
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app),
              fallbackToIndex(connect, 'app/index.html', '/index.html')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9090,
          base: __dirname,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.'),
              fallbackToTest(connect)
            ]
          }
        }
      },
      dist: {
        options: {
          port: 9009,
          base: __dirname+'/dist'
        }
      },
      docs: {
        options: {
          port: 9999,
          base: __dirname+'/docs'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        url: 'http://localhost:<%= connect.test.options.port %>/test/e2e/runner.html'
      },
      docs: {
        url: 'docs/index.html'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      docs: 'docs'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    concat: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    less: {
      development: {
        options: {
          paths: ['app/styles']
        },
        files: [
          { '<%= yeoman.app %>/styles/application.css': '<%= yeoman.app %>/styles/less/application.less' },
          { '<%= yeoman.app %>/styles/bootstrap.css': '<%= yeoman.app %>/components/bootstrap/less/bootstrap.less' }
        ]
      },
      production: {
        options: {
          paths: ['app/styles']
        },
        files: [
          { '<%= yeoman.app %>/styles/application.css': '<%= yeoman.app %>/styles/less/application.less' },
          { '<%= yeoman.app %>/styles/bootstrap.css': '<%= yeoman.app %>/components/bootstrap/less/bootstrap.less' }
        ]
      },
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/screen.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
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
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/**/*.html', 'views/**/partials/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'app/scripts',
          mainConfigFile: "app/scripts/main.js",
          out: "<%=yeoman.dist %>/scripts/scripts.js",
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
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*.{js,css,eot,svg,ttf,woff,png,jpg,jpeg,gif,webp}',
            'images/{,*/}*.{gif,webp, png}',
            'images/**/*.{gif,webp, png}',
            'styles/fonts/**/*',
            'fonts/**/*',
            'home/**/*'
          ]
        }]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('docs', ['clean:docs','docular']);

  grunt.registerTask('server', [
    'clean:server',
    'livereload-start',
    'connect:livereload',
    'connect:test',
    'connect:dist',
    'connect:docs',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    // 'jshint',
    'useminPrepare',
    'imagemin',
    'less',
    'cssmin',
    'htmlmin',
    'copy',
    'ngmin',
    'requirejs',
    'rev',
    'usemin',
    'docs'
  ]);

  grunt.registerTask('default', ['build']);
};
