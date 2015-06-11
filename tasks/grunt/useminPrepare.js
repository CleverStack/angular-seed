module.exports = {
  html:             '<%= appConfig.dev.path %>/index.html',
  options: {
    root:           '<%= appConfig.dev.path %>',
    dest:           '<%= appConfig.dist.path %>'
  }
};
