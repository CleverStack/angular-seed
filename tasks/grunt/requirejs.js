module.exports = {
  compile: {
    options: {
      name:                     'main',
      baseUrl:                  '<%= appConfig.dist.path %>/modules',
      out:                      '<%= appConfig.dist.path %>/scripts/scripts.js',
      findNestedDependencies:   true,
      preserveLicenseComments:  false,
      generateSourceMaps:       false,
      optimize:                 'uglify2',
      uglify2: {
        mangle:                 true,
        compress: {
          'drop_console':       true,
          'drop_debugger':      true,
          'dead_code':          true,
          'join_vars':          true,
          'if_return':          true,
          'negate_iife':        true,
          booleans:             true,
          loops:                true,
          unused:               true
        }
      }
    }
  }
};
