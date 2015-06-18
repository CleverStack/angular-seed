module.exports = {
  server      : '.tmp',
  dist: {
    files     : [{
      dot     : true,
      src     : [ '.tmp', '<%= appConfig.dist.path %>/*', '!<%= appConfig.dist.path %>/.git*' ]
    }]
  },
  coverage: {
    files     : [{
      dot     : true,
      src     : [ '<%= appConfig.test.unit.coverage.path %>*' ]
    }]
  },
  coverageE2E: {
    files     : [{
      dot     : true,
      src     : [ '<%= appConfig.test.e2e.coverage.path %>*' ]
    }]
  },
};
