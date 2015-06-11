module.exports = {
  options: {
    jshintrc : '.jshintrc',
    reporter : require( 'jshint-stylish' ),
    ignores: [
      '<%= appConfig.dev.path %>/modules/**/test*/**/*.js'
    ]
  },
  all:              [
    'Gruntfile.js',
    '<%= appConfig.dev.path %>/modules/**/*.js'
  ]
};
