module.exports = {
  config: {
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
  register: function(grunt) {
    //for less compilation force
    grunt.option( 'force', true );
  }
};
