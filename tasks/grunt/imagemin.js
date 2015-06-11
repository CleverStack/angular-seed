module.exports = {
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
};
