module.exports = {
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
};
