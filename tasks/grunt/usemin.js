module.exports = {
  html:             [ '<%= appConfig.dist.path %>/index.html', '<%= appConfig.dist.path %>/modules/**/views/**/*.html' ],
  css:              [ '<%= appConfig.dist.path %>/styles/**/*.css' ],
  options: {
    dirs:           [ '<%= appConfig.dist.path %>' ]
  }
};
