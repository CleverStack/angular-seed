module.exports = {
  server: {
    url:            'http://localhost:<%= connect.options.port %>'
  },
  test: {
    url:            'http://localhost:<%= connect.test.options.port %>'
  },
  dist: {
    url:            'http://localhost:<%= connect.dist.options.port %>'
  },
  coverage: {
    url:            'http://localhost:<%= appConfig.test.unit.coverage.port %>'
  },
  coverageE2E: {
    url:            'http://localhost:<%= appConfig.test.e2e.report.port %>'
  }
};
