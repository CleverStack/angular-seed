module.exports = {
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
  jade: {
    files: [
      './app/modules/**/views/**/*.jade'
    ],
    tasks: [
      'jade:compile'
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
};
