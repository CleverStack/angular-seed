module.exports = {
  src:              '<%= appConfig.test.e2e.instrumented.path %>*.json',
  options: {
    type:           'html',
    dir:            '<%= appConfig.test.e2e.coverage.path %>reports',
    print:          'detail'
  }
};
