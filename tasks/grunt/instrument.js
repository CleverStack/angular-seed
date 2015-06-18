module.exports = {
  options: {
    lazy     : true,
    basePath : '<%= appConfig.test.e2e.instrumented.path %>'
  },
  files: [
    'app/modules/**/scripts/*.js',
    'app/modules/**/controllers/*.js',
    'app/modules/**/directives/*.js',
    'app/modules/**/factories/*.js',
    'app/modules/**/services/*.js',
    'app/modules/**/providers/*.js',
    'app/modules/**/models/*.js',
    'app/modules/**/filters/*.js'
  ]
};
