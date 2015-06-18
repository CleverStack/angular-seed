module.exports = {
  options: {
    singleQuotes:   true,
    regexp:         '^(ng\n?[\\ ]+(.*)|(module.*))$'
  },
  dist: {
    files:          [ { add: true, src: 'dist/modules/**/*.js' } ]
  }
};
