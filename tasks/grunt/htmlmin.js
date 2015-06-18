module.exports = {
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
};
